import React, { use, useEffect } from "react";
import eImg from "../../public/images/event-details.jpg";
import Image from "next/image";
import useFetch from "../../hooks/useFetch";
import {
  getHeight,
  getImage,
  getLocalStorageData,
  getWidth,
} from "../../helpers/globalFunction";
import dateFormat, { masks } from "dateformat";

export const CalendarDetails = ({ setDetailsCalendar, eventId }: any) => {
  const [language, setLanguage] = React.useState<any>("en");

  const lngData = getLocalStorageData("lan");

  const { loading, error, data } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}?populate=deep&locale=${lngData}`
  );

  useEffect(() => {
    if (lngData) {
      setLanguage(lngData);
    } else {
      localStorage.setItem("lan", JSON.stringify("en"));
      setLanguage("en");
    }
  }, [lngData]);

  const event: any = data?.data?.attributes;

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
        <h4 className="tp-title">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          {event?.Title}
        </h4>
        <div className="row">
          <div className="col-lg-5">
            <div className="details-img">
              <Image
                src={getImage(event?.Thumbnail)}
                height={getHeight(event?.Thumbnail)}
                width={getWidth(event?.Thumbnail)}
                alt=""
              />
              <ul>
                <li>
                  <Image src={eImg} alt="" />
                </li>
                <li>
                  <Image src={eImg} alt="" />
                </li>
                <li>
                  <Image src={eImg} alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="event-text">
              <div className="event-text-top">
                <b>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  {event?.Location}
                </b>
                <span>{dateFormat(event?.StartDate, "d/mm/yyyy")} </span>
              </div>
              <p>{event?.Description}</p>
              <p>{event?.Description}</p>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <a href={event?.EventSite} className="theme-btn">
            book tickets
          </a>
          <a href={event?.LocationOnMap} className="theme-btn">
            Location on map
          </a>
          <a href={event?.EventSite} className="theme-btn">
            visit event site
          </a>
        </div>
      </div>
    </div>
  );
};
