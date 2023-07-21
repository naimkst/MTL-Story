import React, { use, useEffect } from "react";
import eImg from "../../public/images/product.jpg";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

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

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          setCheckout(false);
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
        <h4 className="tp-title"><i className="fa fa-arrow-left" aria-hidden="true"></i>Checkout</h4>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={""}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Shopping cart</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h3>Edit Shopping Cart</h3>
            <div className="shoping-wrap">
              <div className="shopping-img">
                <Image src={eImg} alt="" />
              </div>
              <div className="shopping-text">
                <h4>Integer semper metus ultrices</h4>
                <ul>
                  <li>Color: <span className="color"></span></li>
                  <li>Size: M</li>
                  <li>Qty: 4</li>
                </ul>
                <h5>$144.00</h5>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
                  <li>SUB-TOTAL:<span>$144.00</span></li>
                  <li>discounts:<span className="color">$-57.60</span></li>
                  <li>SHIPPING<span>FREE</span></li>
                  <li>TAX:<span>$12.94</span></li>
                  <li className="btm">ORDER TOTAL:<span>$99.34 USD</span></li>
                </ul>
                <p>YOU SAVED: $57.60</p>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
                <input type="text" placeholder="Coupon Code" />
                <button type="button">Apply</button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
} 
