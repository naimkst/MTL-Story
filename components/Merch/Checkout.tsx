import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useStore } from "../../store/store";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  CoCart,
  checkIfAllNotNull,
  countryList,
  isValidEmail,
  priceConvert,
  saveToLocalStorage,
  shopAPi,
} from "../../helpers/globalFunction";
import Payment from "./Payment";
import { toast } from "react-toastify";
import { toastTime } from "../../helpers/variables";

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

export const Checkout = ({
  setCheckout,
  setCoupon,
  couponApply,
  setCartItemRemove,
}: any) => {
  const [cartData, setCartData] = React.useState<any>([]);
  const [updateCupon, setUpdateCupon] = React.useState<any>(false);
  const [differentAddress, setDifferentAddress] = React.useState<any>(false);
  const [itemsResult, setItemsResult] = React.useState<any>();
  const [expanded, setExpanded] = React.useState("panel1");

  const [
    isCart,
    isCartActive,
    isPaymnet,
    setIsShipping,
    setSubTotal,
    subTotals,
    cartItems,
    setOrderCreate,
    orderCreate,
    orderSuccess,
    setOrderSuccess,
    isPaymnetSuccess,
    setIsUpdate,
    userItem,
    setUserItem,
    setIsprocess,
  ] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
    state.isPaymnet,
    state.setIsShipping,
    state.setSubTotal,
    state.subTotals,
    state.cartItems,
    state.setOrderCreate,
    state.orderCreate,
    state.orderSuccess,
    state.setOrderSuccess,
    state.isPaymnetSuccess,
    state.setIsUpdate,
    state.userItem,
    state.setUserItem,
    state.setIsprocess,
  ]);

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

  const [address, setAddress] = useState({
    street_number: "",
    route: "",
    sublocality_level_1: "",
    locality: "",
    administrative_area_level_3: "",
    administrative_area_level_2: "",
    administrative_area_level_1: "",
    country: "",
    postal_code: "",
  });

  const isEmail = isValidEmail(billing?.email);

  const isAllNotNull = checkIfAllNotNull(billing);

  const items = cartItems?.[4];
  const subTotal = cartItems?.[13];
  const getCoupon = cartItems?.[7];

  useEffect(() => {
    if (isAllNotNull) {
      if (isEmail === false) {
        setIsShipping(false);
      } else {
        setIsShipping(isAllNotNull);
      }
    } else {
      if (isEmail === false) {
        setIsShipping(false);
      } else {
        setIsShipping(isAllNotNull);
      }
    }
  }, [isAllNotNull, isEmail]);

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const clearCartData = async () => {
    try {
      CoCart.post("cart/clear", {}, {})
        .then((response) => {
          // Successful request
          console.log("Response Status:", response.status);
          console.log("Response Headers:", response.headers);
          console.log("Response Data:", response.data);
          isPaymnetSuccess([]);
          setOrderSuccess(true);
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
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    try {
      const lineItems = items?.[1]?.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity.value,
      }));
      setItemsResult(lineItems);
    } catch (error) {
      console.log("error", error);
    }
    setSubTotal(subTotal?.[1]);
  }, [items?.[1]]);

  console.log("isPaymnet", orderSuccess);

  const placeOrder = async () => {
    shopAPi
      .get("customers")
      .then((response) => {
        const user = response?.data?.filter(
          (item: any) => item?.email === billing?.email
        );
        setUserItem(user[0]);
        if (user[0]) {
          console.log("user", user[0]?.id);
          if (getCoupon?.[1]?.length !== 0 && itemsResult) {
            try {
              const data = {
                payment_method: "card",
                payment_method_title: "Stripe Transfer",
                set_paid: isPaymnet?.id ? true : false,
                transaction_id: isPaymnet?.id,
                customer_id: user[0]?.id,
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
                  last_name: differentAddress
                    ? shipping?.last_name
                    : billing?.last_name,
                  address_1: differentAddress
                    ? shipping?.address_1
                    : billing?.address_1,
                  address_2: differentAddress
                    ? shipping?.address_2
                    : billing?.address_2,
                  city: differentAddress ? shipping?.city : billing?.city,
                  state: differentAddress ? shipping?.state : billing?.state,
                  postcode: differentAddress
                    ? shipping?.postcode
                    : billing?.postcode,
                  country: differentAddress
                    ? shipping?.country
                    : billing?.country,
                },
                line_items: itemsResult,
                // shipping_lines: [
                //   {
                //     method_id: "flat_rate",
                //     method_title: "",
                //     total: "",
                //   },
                // ],
                coupon_lines: [
                  {
                    code:
                      getCoupon[1].length !== 0
                        ? getCoupon[1]?.[0]?.coupon
                        : "",
                  },
                ],
              };
              const orderPlace = shopAPi
                .post("orders", data)
                .then((response) => {
                  console.log(response.data);
                  console.log(response.data?.id);
                  setOrderCreate(response.data);
                  setBilling({
                    first_name: "",
                    last_name: "",
                    company: "",
                    address_1: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                    email: "",
                    phone: "",
                  });
                  setShipping({
                    first_name: "",
                    last_name: "",
                    address_1: "",
                    address_2: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                  });
                  toast.success("Order placed successfully!", {
                    autoClose: toastTime,
                  });
                  clearCartData();
                  setIsprocess(false);
                })
                .catch((error) => {
                  console.log(error.response.data);
                  toast.error("Something went wrong!", {
                    autoClose: toastTime,
                  });
                  setIsprocess(false);
                });
              console.log("orderPlace", orderPlace);
            } catch (error) {
              console.log("error", error);
              toast.error("Something went wrong!", { autoClose: toastTime });
              setIsprocess(false);
            }
          }
          if (itemsResult) {
            try {
              const data = {
                payment_method: "card",
                payment_method_title: "Stripe Transfer",
                set_paid: isPaymnet?.id ? true : false,
                transaction_id: isPaymnet?.id,
                customer_id: user[0]?.id,
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
                  last_name: differentAddress
                    ? shipping?.last_name
                    : billing?.last_name,
                  address_1: differentAddress
                    ? shipping?.address_1
                    : billing?.address_1,
                  address_2: differentAddress
                    ? shipping?.address_2
                    : billing?.address_2,
                  city: differentAddress ? shipping?.city : billing?.city,
                  state: differentAddress ? shipping?.state : billing?.state,
                  postcode: differentAddress
                    ? shipping?.postcode
                    : billing?.postcode,
                  country: differentAddress
                    ? shipping?.country
                    : billing?.country,
                },
                line_items: itemsResult,
              };
              const orderPlace = shopAPi
                .post("orders", data)
                .then((response) => {
                  console.log(response.data);
                  setOrderCreate(response.data);
                  setBilling({
                    first_name: "",
                    last_name: "",
                    company: "",
                    address_1: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                    email: "",
                    phone: "",
                  });
                  setShipping({
                    first_name: "",
                    last_name: "",
                    address_1: "",
                    address_2: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                  });
                  toast.success("Order placed successfully!", {
                    autoClose: toastTime,
                  });
                  clearCartData();
                  setIsprocess(false);
                })

                .catch((error) => {
                  console.log(error.response.data);
                  toast.error("Something went wrong!", {
                    autoClose: toastTime,
                  });
                  setIsprocess(false);
                });
              console.log("orderPlace", orderPlace);
            } catch (error) {
              console.log("error", error);
              toast.error("Something went wrong!", { autoClose: toastTime });
              setIsprocess(false);
            }
          }
        } else {
          const data = {
            email: billing?.email,
            first_name: billing?.first_name,
            last_name: billing?.last_name,
            username: billing?.email,
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
              company: differentAddress ? billing?.company : "",
              last_name: differentAddress
                ? shipping?.last_name
                : billing?.last_name,
              address_1: differentAddress
                ? shipping?.address_1
                : billing?.address_1,
              address_2: differentAddress
                ? shipping?.address_2
                : billing?.address_2,
              city: differentAddress ? shipping?.city : billing?.city,
              state: differentAddress ? shipping?.state : billing?.state,
              postcode: differentAddress
                ? shipping?.postcode
                : billing?.postcode,
              country: differentAddress ? shipping?.country : billing?.country,
            },
          };
          shopAPi
            .post("customers", data)
            .then((response) => {
              console.log(response.data);
              console.log(response.data.id);
              setUserItem(response.data);
              console.log("user", user[0]?.id);
              if (getCoupon?.[1]?.length !== 0 && itemsResult) {
                try {
                  const data = {
                    payment_method: "card",
                    payment_method_title: "Stripe Transfer",
                    set_paid: isPaymnet?.id ? true : false,
                    transaction_id: isPaymnet?.id,
                    customer_id: response.data.id,
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
                      last_name: differentAddress
                        ? shipping?.last_name
                        : billing?.last_name,
                      address_1: differentAddress
                        ? shipping?.address_1
                        : billing?.address_1,
                      address_2: differentAddress
                        ? shipping?.address_2
                        : billing?.address_2,
                      city: differentAddress ? shipping?.city : billing?.city,
                      state: differentAddress
                        ? shipping?.state
                        : billing?.state,
                      postcode: differentAddress
                        ? shipping?.postcode
                        : billing?.postcode,
                      country: differentAddress
                        ? shipping?.country
                        : billing?.country,
                    },
                    line_items: itemsResult,
                    // shipping_lines: [
                    //   {
                    //     method_id: "flat_rate",
                    //     method_title: "",
                    //     total: "",
                    //   },
                    // ],
                    coupon_lines: [
                      {
                        code:
                          getCoupon[1].length !== 0
                            ? getCoupon[1]?.[0]?.coupon
                            : "",
                      },
                    ],
                  };
                  const orderPlace = shopAPi
                    .post("orders", data)
                    .then((response) => {
                      console.log(response.data);
                      console.log(response.data?.id);
                      setOrderCreate(response.data);
                      setBilling({
                        first_name: "",
                        last_name: "",
                        company: "",
                        address_1: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "",
                        email: "",
                        phone: "",
                      });
                      setShipping({
                        first_name: "",
                        last_name: "",
                        address_1: "",
                        address_2: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "",
                      });
                      clearCartData();
                      toast.success("Order placed successfully!", {
                        autoClose: toastTime,
                      });
                      setIsprocess(false);
                    })
                    .catch((error) => {
                      console.log(error.response.data);
                      toast.error("Something went wrong!", {
                        autoClose: toastTime,
                      });
                      setIsprocess(false);
                    });

                  console.log("orderPlace", orderPlace);
                } catch (error) {
                  console.log("error", error);
                  toast.error("Something went wrong!", {
                    autoClose: toastTime,
                  });
                  setIsprocess(false);
                }
              }
              if (itemsResult) {
                try {
                  const data = {
                    payment_method: "card",
                    payment_method_title: "Stripe Transfer",
                    set_paid: isPaymnet?.id ? true : false,
                    transaction_id: isPaymnet?.id,
                    customer_id: response.data.id,
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
                      last_name: differentAddress
                        ? shipping?.last_name
                        : billing?.last_name,
                      address_1: differentAddress
                        ? shipping?.address_1
                        : billing?.address_1,
                      address_2: differentAddress
                        ? shipping?.address_2
                        : billing?.address_2,
                      city: differentAddress ? shipping?.city : billing?.city,
                      state: differentAddress
                        ? shipping?.state
                        : billing?.state,
                      postcode: differentAddress
                        ? shipping?.postcode
                        : billing?.postcode,
                      country: differentAddress
                        ? shipping?.country
                        : billing?.country,
                    },
                    line_items: itemsResult,
                  };
                  const orderPlace = shopAPi
                    .post("orders", data)
                    .then((response) => {
                      console.log(response.data);
                      setOrderCreate(response.data);
                      setBilling({
                        first_name: "",
                        last_name: "",
                        company: "",
                        address_1: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "",
                        email: "",
                        phone: "",
                      });
                      setShipping({
                        first_name: "",
                        last_name: "",
                        address_1: "",
                        address_2: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "",
                      });
                      clearCartData();
                      toast.success("Order placed successfully!", {
                        autoClose: toastTime,
                      });
                      setIsprocess(false);
                    })
                    .catch((error) => {
                      console.log(error.response.data);
                      toast.error("Something went wrong!", {
                        autoClose: toastTime,
                      });
                      setIsprocess(false);
                    });
                  console.log("orderPlace", orderPlace);
                } catch (error) {
                  console.log("error", error);
                  toast.error("Something went wrong!", {
                    autoClose: toastTime,
                  });
                  setIsprocess(false);
                }
              }
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (isPaymnet?.status === "succeeded") {
      console.log("create wordress order ======");
      placeOrder();
    }
  }, [isPaymnet]);

  const removeCartItem = (id: any) => {
    CoCart.delete(`cart/item/${id}`)
      .then((response) => {
        // Successful request
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Response Data:", response.data);
        if (response.status === 200) {
          setCartItemRemove(id);
          toast.success("Remove successfully!", { autoClose: toastTime });
        }
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        toast.error("Something went wrong!", { autoClose: toastTime });
      })
      .finally(() => {
        // Always executed.
      });
  };

  const qtyUpdate = (item_key: any, qty: any) => {
    console.log("qty", qty);
    var data = {
      quantity: qty == 0 ? 1 : qty,
    };
    CoCart.post(`cart/item/${item_key}`, data)
      .then((response) => {
        // Successful request
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Response Data:", response.data);
        if (response.status === 200) {
          setCartItemRemove(qty);
          toast.success("Successfully updated!", { autoClose: toastTime });
        }
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        toast.error("Something went wrong!", { autoClose: toastTime });
      })
      .finally(() => {
        // Always executed.
      });
  };

  const handleSelect = async (selectedAddress: any) => {
    const results = await geocodeByAddress(selectedAddress);
    const selectedPlace = results[0];

    setAddress({
      street_number: "",
      route: "",
      sublocality_level_1: "",
      locality: "",
      administrative_area_level_3: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
      ...Object.fromEntries(
        selectedPlace.address_components.map((component) => [
          component.types[0],
          component.long_name,
        ])
      ),
    });
  };

  useEffect(() => {
    setBilling((prev: any) => ({
      ...prev,
      address_1: address?.route,
    }));
    setBilling((prev: any) => ({
      ...prev,
      city: address?.locality,
    }));
    setBilling((prev: any) => ({
      ...prev,
      postcode: address?.postal_code,
    }));
    setBilling((prev: any) => ({
      ...prev,
      country: address?.country,
    }));
    setBilling((prev: any) => ({
      ...prev,
      state: address?.administrative_area_level_1,
    }));
  }, [address]);

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
            {items?.[1].length === 0 && <h2>No cart item found!</h2>}
            {items?.[1]?.map((item: any, index: number) => (
              <div key={`cartItem-${index}`} className="shoping-wrap">
                <span
                  onClick={() => removeCartItem(item?.item_key)}
                  className="cartRemove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
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
                  </ul>
                  <ul className="singlePrdQty">
                    <li className="">
                      Qty:
                      <div
                        onClick={() =>
                          qtyUpdate(
                            item?.item_key,
                            Number(item?.quantity?.value) - 1
                          )
                        }
                        className="qtyButton"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>{item?.quantity?.value}</div>
                      <div
                        onClick={() =>
                          qtyUpdate(
                            item?.item_key,
                            Number(item?.quantity?.value) + 1
                          )
                        }
                        className="qtyButton"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                  <h5>${priceConvert(item?.price)}</h5>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "coponCode"}
          onChange={handleChange("coponCode")}
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
          expanded={expanded === "orderSummery"}
          onChange={handleChange("orderSummery")}
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
                    SHIPPING
                    <span>${priceConvert(subTotal?.[1]?.shipping_total)}</span>
                  </li>
                  <li>
                    TAX:<span>${priceConvert(subTotal?.[1]?.total_tax)}</span>
                  </li>
                  <li className="btm">
                    ORDER TOTAL:
                    <span>${priceConvert(subTotal?.[1]?.total)} USD</span>
                  </li>
                </ul>
                <p>YOU SAVED: ${priceConvert(subTotal?.[1]?.discount_total)}</p>
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
              {/* <div className="inputField">
                {Object.keys(address).length > 0 && (
                  <div>
                    <h2>Address Details</h2>
                    <p>Street Number: {address.street_number}</p>
                    <p>Route: {address.route}</p>
                    <p>Province: {address.sublocality_level_1}</p>
                    <p>City: {address.locality}</p>
                    <p>
                      Admin Area Level 3: {address.administrative_area_level_3}
                    </p>
                    <p>
                      Admin Area Level 2: {address.administrative_area_level_2}
                    </p>
                    <p>
                      Admin Area Level 1: {address.administrative_area_level_1}
                    </p>
                    <p>Country: {address.country}</p>
                    <p>Postal Code: {address.postal_code}</p>
                  </div>
                )}
              </div> */}
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
                      This field is required
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
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>Company name</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        compnay: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Company name"
                    value={billing?.compnay}
                  />
                  {billing?.compnay === "" && (
                    <span className="requiredFiled">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="">
                  <h3>Street address</h3>
                  {/* <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        address_1: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Street address"
                    value={billing?.address_1}
                  /> */}

                  <PlacesAutocomplete
                    value={address.route}
                    onChange={(newValue) =>
                      setAddress({ ...address, route: newValue })
                    }
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div className="addressAuto">
                        <input
                          {...getInputProps({ placeholder: "Search Places" })}
                        />
                        {suggestions?.length !== 0 && (
                          <div className="addressList">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </PlacesAutocomplete>
                  {billing?.address_1 === "" && (
                    <span className="requiredFiled">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
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
                      <option
                        key={`country-${index}`}
                        value={item?.code}
                        selected={item?.name == billing.country ? true : false}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {billing?.country === "" && (
                    <span className="requiredFiled">
                      This field is required
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
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="inputField">
                <div>
                  <h3>Province</h3>
                  <input
                    onChange={(e) =>
                      setBilling((prev: any) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Province"
                    value={billing?.state}
                  />
                  {billing?.state === "" && (
                    <span className="requiredFiled">
                      This field is required
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
                      This field is required
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
                      This field is required
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
                  {isEmail === false && (
                    <span className="requiredFiled">Email is not valid! </span>
                  )}
                  {billing?.email === "" && (
                    <span className="requiredFiled">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              ;{/* ship to a different address? */}
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
                        <option key={`countryTwo-${index}`} value={item?.code}>
                          {item?.name}
                        </option>
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
                      placeholder="Province"
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

        {JSON.stringify(subTotal?.total)}

        {subTotals?.total !== "0" && (
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
              <Typography>
                <Payment />
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}

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
