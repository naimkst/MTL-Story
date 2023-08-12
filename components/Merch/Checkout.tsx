import React, { use, useEffect } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useStore } from "../../store/store";
import { CoCart, countryList, shopAPi } from "../../helpers/globalFunction";
import Stripe from "stripe";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Payment from "./Payment";

const Accordion: any = styled((props) => (
  <MuiAccordion children disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary: any = styled((props) => (
  <MuiAccordionSummary expandIcon={""} {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const Checkout = ({ setCheckout }: any) => {
  const [cartData, setCartData] = React.useState<any>([]);
  const [coupon, setCoupon] = React.useState<any>("");
  const [updateCupon, setUpdateCupon] = React.useState<any>(false);
  const [differentAddress, setDifferentAddress] = React.useState<any>(false);

  const [isCart, isCartActive, isPaymnet, setIsShipping] = useStore(
    (state: any) => [
      state.isCart,
      state.isCartActive,
      state.isPaymnet,
      state.setIsShipping,
    ]
  );

  const [billing, setBilling] = React.useState<any>({
    first_name: "",
    last_name: "",
    compnay: "",
    address_1: "",
    // address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
  });

  const [shipping, setShipping] = React.useState<any>({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  function checkIfAllNotNull(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === "")) {
        return false;
      }
    }
    return true;
  }

  const isAllNotNull = checkIfAllNotNull(billing);

  useEffect(() => {
    if (isAllNotNull) {
      setIsShipping(isAllNotNull);
    } else {
      setIsShipping(isAllNotNull);
    }
  }, [isAllNotNull]);
  const [expanded, setExpanded] = React.useState("panel1");

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  function priceConvert(price: any) {
    return Number(price) / 100;
  }

  useEffect(() => {
    CoCart.get("cart")
      .then((response) => {
        setCartData(
          Object.entries(response.data) ? Object.entries(response.data) : []
        );
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
      })
      .finally(() => {
        // Always executed.
      });
  }, [updateCupon]);

  const items = cartData[4];
  const subTotal = cartData[13];
  const getCoupon = cartData[7];

  const couponApply = async () => {
    try {
      const couponGet = await fetch(
        `${process.env.NEXT_PUBLIC_STORE_URL}/cart/?wt_coupon=${coupon}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return null;
        });
      setUpdateCupon(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const paymentIntent = async () => {
    // Create a new customer and then create an invoice item then invoice it:
    stripe.customers
      .create({
        email: billing?.email,
      })
      .then((customer: any) => {
        // have access to the customer object
        return stripe.paymentIntents
          .create({
            customer: customer.id, // set the customer id
            amount: 1200, // 12
            currency: "usd",
            description: "One-time setup fee",
          })

          .then((invoice) => {
            // New invoice created on a new customer
            console.log("invoice", invoice);
          })
          .catch((err) => {
            // Deal with an error
            console.log("err", err);
          });
      });
  };
  const placeOrder = () => {
    const data = {
      payment_method: "card",
      payment_method_title: "Stripe Transfer",
      set_paid: true,
      billing: {
        first_name: billing?.first_name,
        last_name: billing?.last_name,
        company: billing?.company,
        address_1: billing?.address_1,
        address_2: billing?.address_2,
        city: billing?.city,
        state: billing?.state,
        postcode: billing?.postcode,
        country: billing?.country,
        email: billing?.email,
        phone: billing?.phone,
      },
      shipping: {
        first_name: differentAddress
          ? shipping?.first_name
          : billing?.first_name,
        last_name: differentAddress ? shipping?.last_name : billing?.last_name,
        address_1: differentAddress ? shipping?.address_1 : billing?.address_1,
        address_2: differentAddress ? shipping?.address_2 : billing?.address_2,
        city: differentAddress ? shipping?.city : billing?.city,
        state: differentAddress ? shipping?.state : billing?.state,
        postcode: differentAddress ? shipping?.postcode : billing?.postcode,
        country: differentAddress ? shipping?.country : billing?.country,
      },
      line_items: [
        {
          product_id: 124,
          quantity: 1,
        },
      ],
      shipping_lines: [
        {
          method_id: "",
          method_title: "",
          total: "",
        },
      ],
      coupon_lines: [
        {
          code: getCoupon ? getCoupon[1]?.[0]?.coupon : "",
        },
      ],
    };

    shopAPi
      .post("orders", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  if (isPaymnet?.payment_intent) {
    console.log("innnnn--------------=====", isPaymnet);
    placeOrder();
  }
  const handleCheckout = () => {
    axios
      .post(`/api/stripe`, {
        cartItems: items?.[1],
        userId: "ttest@gmail.com",
      })
      .then((response) => {
        console.log("@@@@@@@@", response.data);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  // Validate the card number
  // const creatPayment = async () => {
  //   const paymentMethod = await stripe.paymentMethods.create({
  //     type: "card",
  //     card: {
  //       number: "4242424242424242",
  //       exp_month: 2,
  //       exp_year: 2024,
  //       cvc: "314",
  //     },
  //   });

  //   console.log("paymentMethod", paymentMethod);
  // };

  // const options = {
  //   mode: "payment",
  //   amount: 1099,
  //   currency: "usd",
  //   automatic_payment_methods: {
  //     enabal: true,
  //   },
  // };

  // const paymentSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("paymentSubmit");

  //   if (!strip || !element) {
  //     return;
  //   }

  //   const { error } = await strip.confirmPayment({
  //     element,
  //     confirmParams: {
  //       return_url: `${window.location.origin}/success`,
  //     },
  //   });

  //   if (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          isCartActive(false);
        }}
      >
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.1851 0.395264L1.27441 31.3062M1.27441 0.395264L32.1851 31.3059"
            stroke="white"
          />
        </svg>
      </div>
      <div className="wrapper-calendar weeklyCalendar checkout">
        <h4 className="tp-title">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>Checkout
        </h4>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel3bh-content"
            id="panel1bh-header"
          >
            <Typography>COUPON CODE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <h3>Limit one per order</h3> */}
            <Typography>
              <div className="coupon">
                <input
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  placeholder="Coupon Code"
                />
                <button onClick={couponApply} type="button">
                  Apply
                </button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Shopping cart</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h3>Shopping Cart</h3>
            {items?.[1]?.map((item: any, index: number) => (
              <div key={`cartItem-${index}`} className="shoping-wrap">
                <div className="shopping-img">
                  <Image
                    src={item?.featured_image}
                    width={222}
                    height={160}
                    alt=""
                  />
                </div>
                <div className="shopping-text">
                  <h4>{item?.title}</h4>
                  <ul>
                    {item?.meta?.variation?.Color && (
                      <li>
                        Color:{" "}
                        <span
                          style={{
                            background: `${item?.meta?.variation?.Color}`,
                          }}
                          className="color"
                        ></span>
                      </li>
                    )}

                    {item?.meta?.variation?.Size && (
                      <li>Size: {item?.meta?.variation?.Size}</li>
                    )}

                    <li>Qty: {item?.quantity?.value}</li>
                  </ul>
                  <h5>${item?.totals?.total}</h5>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel2bh-content"
            id="panel1bh-header"
          >
            <Typography>ORDER SUMMARY</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <h3>Edit Shopping Cart</h3> */}
            <Typography>
              <div className="order-summary">
                <ul>
                  <li>
                    SUB-TOTAL:
                    <span>${priceConvert(subTotal?.[1]?.subtotal)}</span>
                  </li>
                  <li>
                    discounts:
                    <span className="color">
                      -${priceConvert(subTotal?.[1]?.discount_total)}
                    </span>
                  </li>
                  <li>
                    SHIPPING<span>${subTotal?.[1]?.shipping_total}</span>
                  </li>
                  <li>
                    TAX:<span>${subTotal?.[1]?.total_tax}</span>
                  </li>
                  <li className="btm">
                    ORDER TOTAL:
                    <span>${priceConvert(subTotal?.[1]?.total)} USD</span>
                  </li>
                </ul>
                <p>
                  YOU SAVED: $
                  {priceConvert(subTotal?.[1]?.subtotal) -
                    priceConvert(subTotal?.[1]?.total)}
                </p>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel2bh-content"
            id="panel1bh-header"
          >
            <Typography>Billing details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <h3>Edit Shopping Cart</h3> */}
            <Typography>
              <div className="inputField">
                <div className="">
                  <h3>First Name</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="First name"
                    value={billing?.first_name}
                  />
                  {billing?.first_name === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>

                <div className="">
                  <h3>Last name</h3>
                  <input
                    type="text"
                    placeholder="Last name"
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    value={billing?.last_name}
                  />
                  {billing?.last_name === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>Company name (optional)</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        compnay: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Company name (optional)"
                    value={billing?.compnay}
                  />
                  {billing?.compnay === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>

                <div>
                  <h3>Country / Region</h3>
                  <select
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    name=""
                    id=""
                  >
                    <option value="">Country / Region</option>
                    {countryList?.map((item: any, index: number) => (
                      <option value={item?.code}>{item?.name}</option>
                    ))}
                  </select>
                  {billing?.country === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>Street address</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        address_1: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Street address"
                    value={billing?.address_1}
                  />
                  {billing?.address_1 === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
                <div>
                  <h3>Town / City</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Town / City"
                    value={billing?.city}
                  />
                  {billing?.city === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>District</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="District"
                    value={billing?.state}
                  />
                  {billing?.state === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>

                <div>
                  <h3>Postcode / ZIP</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        postcode: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Postcode / ZIP"
                    value={billing?.postcode}
                  />
                  {billing?.postcode === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>Phone</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Phone"
                    value={billing?.phone}
                  />
                  {billing?.phone === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
                <div>
                  <h3>Email</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Email"
                    value={billing?.email}
                  />
                  {billing?.email === "" && (
                    <span className="requiredFiled">
                      This filed is required
                    </span>
                  )}
                </div>
              </div>

              {/* ship to a different address? */}
              <div className="inputField">
                <div className="different_address">
                  <input
                    onClick={() => setDifferentAddress(!differentAddress)}
                    type="checkbox"
                    value={differentAddress}
                  />

                  <label htmlFor="">Ship to a different address?</label>
                </div>
              </div>

              {differentAddress && (
                <>
                  <div className="inputField">
                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="First name"
                      value={shipping?.first_name}
                    />

                    <input
                      type="text"
                      placeholder="Last name"
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      value={shipping?.last_name}
                    />
                  </div>
                  <div className="inputField">
                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          compnay: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Company name (optional)"
                      value={shipping?.compnay}
                    />

                    <select
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      name=""
                      id=""
                    >
                      <option value="">Country / Region</option>
                      {countryList?.map((item: any, index: number) => (
                        <option value={item?.code}>{item?.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="inputField">
                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          address_1: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Street address"
                      value={shipping?.address_1}
                    />

                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Town / City"
                      value={shipping?.city}
                    />
                  </div>
                  <div className="inputField">
                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="District"
                      value={shipping?.state}
                    />

                    <input
                      onChange={(e) =>
                        setShipping((prev: any) => ({
                          ...prev,
                          postcode: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Postcode / ZIP"
                      value={shipping?.postcode}
                    />
                  </div>
                </>
              )}

              {/* Order notes */}
              {/* <div className="coupon">
                <input
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  placeholder="Order notes"
                />
              </div> */}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "payment"}
          onChange={handleChange("payment")}
        >
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel2bh-content"
            id="panel1bh-header"
          >
            <Typography>Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <h3>Edit Shopping Cart</h3> */}
            <Typography>
              {/* <form onSubmit={paymentSubmit}>
                <Elements options={options} stripe={stripePromise}>
                  <PaymentElement />
                </Elements>
                <button
                  className="checkoutBtn mt-3"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay
                </button>
              </form> */}

              <Payment />
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* {isAllNotNull ? (
          <div
            className="checkoutBtn"
            onClick={() => {
              setCheckout(true);
              handleCheckout();
            }}
          >
            Checkout
          </div>
        ) : (
          <>
            <div className="text-center mb-3">
              <span className="billingDetails">
                Billing details are required!
              </span>
            </div>
            <div className="btnDisable">checkout</div>
          </>
        )} */}
      </div>
    </div>
  );
};
