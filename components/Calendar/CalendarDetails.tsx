import React, { use, useEffect } from "react";
import eImg from "../../public/images/event-details.jpg";
import Image from "next/image";

export const CalendarDetails = ({ setDetailsCalendar }: any) => {

  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          setDetailsCalendar(false);
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
      <div className="wrapper-calendar weeklyCalendar calenderDetails">
        <div className="row">
          <div className="col-lg-5">
            <div className="details-img">
              <Image src={eImg} alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="event-text">
              <span> 22/06/2023 </span>
              <h4>Integer semper metus ultrices</h4>
              <b>
                <i
                  className="fa fa-map-marker"
                  aria-hidden="true"
                ></i> 86-87 Victoria Rd, Swindon
              </b>
              <p>Nullam diam vitae ac volutpat aliquam nisl maecenas blandit viverra. Nam non egestas lobortis ornare adipiscing ut. Nullam ut tincidunt lectus integer tempor at felis id. Lobortis venenatis consequat morbi egestas. Orci arcu ipsum nec non convallis non scelerisque sed nulla. Sed risus blandit duis leo porttitor. Id nunc justo egestas sed pretium urna in in tristique. Scelerisque viverra ultricies.</p>
              <div className="btn-wrap">
                <a className="theme-btn">Location on map</a>
                <a className="theme-btn">visit event site</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
