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
  const [thumbnail, setThumbnail] = React.useState<any>("");

  const lngData = getLocalStorageData("lan");

  console.log(eventId, "eventId");
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
  useEffect(() => {
    setThumbnail(event?.Thumbnail?.data[0]?.attributes);
  }, [event]);

  console.log(thumbnail, "thumbnail");

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
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${
                  thumbnail?.url ? thumbnail?.url : " "
                }`}
                height={thumbnail?.height ? thumbnail?.height : 0}
                width={thumbnail?.width ? thumbnail?.width : 0}
                alt=""
              />
              {event?.Thumbnail?.data?.length > 1 && (
                <ul className="thumbnailSmallImg">
                  {event?.Thumbnail?.data?.map((item: any, index: number) => (
                    <li
                      onClick={() => setThumbnail(item?.attributes)}
                      key={`{eventDetailsImg-${index}}`}
                    >
                      <Image
                        className={`${
                          thumbnail?.url === item?.attributes?.url
                            ? "active"
                            : ""
                        }`}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${
                          item?.attributes?.url ? item?.attributes?.url : " "
                        }`}
                        height={
                          item?.attributes?.height
                            ? item?.attributes?.height
                            : 0
                        }
                        width={
                          item?.attributes?.width ? item?.attributes?.width : 0
                        }
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
              )}
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
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <a href={event?.BookTicket} className="theme-btn">
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
