import React, { use, useEffect } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useStore } from "../../store/store";
import { CoCart } from "../../helpers/globalFunction";

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
  const [isCart, isCartActive] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
  ]);

  const [expanded, setExpanded] = React.useState("panel1");

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
            <h3>Limit one per order</h3>
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
            <h3>Edit Shopping Cart</h3>
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
            <h3>Edit Shopping Cart</h3>
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
        <div
          className="checkoutBtn"
          onClick={() => {
            setCheckout(true);
          }}
        >
          checkout
        </div>
      </div>
    </div>
  );
};
