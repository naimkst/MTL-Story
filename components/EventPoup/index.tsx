import React, { use, useEffect } from "react";
import social1 from "../../public/images/icon/4.svg";
import social2 from "../../public/images/icon/5.svg";
import social3 from "../../public/images/icon/6.svg";
import Image from "next/image";
import Link from "next/link";

const EventPopup = ({ setEventSignUp, EventPopupData, global }: any) => {
  return (
    <div className="calendar-box topEventBox">
      <div className="wrapper-calendar weeklyCalendar calenderDetails topEvent">
        <div
          className="calendarClose"
          onClick={() => {
            setEventSignUp(false);
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
        <h4 className="tp-title topEventTitle">
          {EventPopupData?.EventPopupTitle}
        </h4>

        <h4 className="tp-title topEventSignup">
          {EventPopupData?.EventPopupSignUpTitle}
        </h4>

        {/* <div className="signupBox">
          <input
            type="text"
            className="signupInput"
            placeholder="Enter Your Email Address Here.."
          />
        </div> */}

        <div className="socialMedia">
          <ul>
            {global?.SocialMedia?.Instagram && (
              <li>
                <Link href={String(global?.SocialMedia?.Instagram) || "/"}>
                  <Image src={social1} alt="" />
                </Link>
              </li>
            )}

            {global?.SocialMedia?.TikTok && (
              <li>
                <Link href={String(global?.SocialMedia?.TikTok) || "/"}>
                  <Image src={social2} alt="" />
                </Link>
              </li>
            )}
            {global?.SocialMedia?.Youtube && (
              <li>
                <Link href={String(global?.SocialMedia?.Youtube) || "/"}>
                  <Image src={social3} alt="" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
