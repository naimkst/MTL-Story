import React, { use, useEffect } from "react";
import eImg from "../../public/images/event.jpg";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";
import dateFormat, { masks } from "dateformat";
import { CalendarDetails } from "./CalendarDetails";

export const CalendarDate = ({ setCalendarDate, eventId, eventLists }: any) => {
  const [calendarDetails, setDetailsCalendar] = React.useState<any>(false);
  const [eventIds, setEeventId] = React.useState<any>("");

  console.log(eventIds, "eventIds====");
  return (
    <>
      <div className="calendar-box">
        <div
          className="calendarClose"
          onClick={() => {
            setCalendarDate(false);
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
        <div className="wrapper-calendar weeklyCalendar calenderDate">
          <div className="cl-top">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            <h4 className="tp-title">tuesday 14/09/2023</h4>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </div>
          <div className="row">
            <div className="event-wrap">
              <h2></h2>

              <Slide cascade direction="up" triggerOnce="false" duration="500">
                {eventLists?.map((item: any, index: number) => (
                  <div
                    onClick={() => {
                      setDetailsCalendar(true);
                      setEeventId(item?.id);
                    }}
                    key={`eventGroupList${index}`}
                    className="event-item"
                  >
                    <div className="event-img">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.attributes?.Thumbnail?.data[0]?.attributes?.url}`}
                        height={
                          item?.attributes?.Thumbnail?.data[0]?.attributes
                            ?.height
                        }
                        width={
                          item?.attributes?.Thumbnail?.data[0]?.attributes
                            ?.width
                        }
                        alt=""
                      />
                    </div>

                    <div className="event-text">
                      <span>
                        {dateFormat(item?.attributes?.StartDate, "d/mm/yyyy")}{" "}
                      </span>

                      <h4>
                        <a>{item?.attributes?.Title}</a>
                      </h4>
                      <p>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        {item?.attributes?.Location}
                      </p>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
        </div>
      </div>

      {calendarDetails && (
        <CalendarDetails
          setDetailsCalendar={setDetailsCalendar}
          eventId={eventIds}
        />
      )}
    </>
  );
};
