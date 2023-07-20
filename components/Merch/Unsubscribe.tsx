import React, { use, useEffect } from "react";
import eImg from "../../public/images/product.jpg";
import Image from "next/image";

export const Unsubscribe = ({ setUnsubscribe }: any) => {

  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          setUnsubscribe(false);
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
      <div className="wrapper-calendar weeklyCalendar unsubscribe">
        <div className="uns-top">
          <p>We are sorry to hear that you are leaving our community. </p>
          <p>We hope to have you back onboard sooner than later!</p>
        </div>
        <div className="uns-bottom">
          <p>With <span>❤</span>, the MTLStories Team</p>
        </div>

        <div className="btn-wrap">
          <a href="#" className="theme-btn">Unsubscribe</a>
        </div>
      </div>
    </div>
  );
} 
