import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import NavLink from "next/link";
import { Link } from "react-scroll";
import eImg from "../../public/images/event.jpg";
import { Slide } from "react-awesome-reveal";
import CalenderPopup from "../CalenderPopup";
import { EventCalendar } from "../Calendar";
import { WeeklyCalendar } from "../Calendar/WeeklyCalendar";
import { CalendarDetails } from "../Calendar/CalendarDetails";
import { CalendarDate } from "../Calendar/CalendarDate";
import dateFormat, { masks } from "dateformat";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EventPopup from "../EventPoup";

var settings = {
  dots: false,
  arrows: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  loop: false,
};

const CalenderSection = ({ data, eventData, EventPopupData, global }: any) => {
  const [open, setOpen] = React.useState<any>(false);
  const [monthlyCalendar, setMonthlyCalendar] = React.useState<any>(false);
  const [weeklyCalendar, setWeeklyCalendar] = React.useState<any>(false);
  const [calendarDetails, setDetailsCalendar] = React.useState<any>(false);
  const [eventSignup, setEventSignUp] = React.useState<any>(false);
  const [calendarDate, setCalendarDate] = React.useState<any>(false);
  const [eventId, setEeventId] = React.useState<any>("");
  const [events, setEvents] = React.useState<any>([]);

  const sliderRef = useRef(null);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setState(item);
  };

  const eventsByDate = eventData?.data?.reduce((acc: any, event: any) => {
    const eventDate = event?.attributes?.StartDate?.split("/")
      .reverse()
      .join("-"); // Convert date to ISO format

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});

  // Sort the dates in ascending order

  useEffect(() => {
    if (eventsByDate) {
      const sortedDates = Object.entries(eventsByDate).sort();
      setEvents(sortedDates);
    } else {
      setEvents(eventsByDate);
    }
  }, [eventData]);

  const activeDate = (date: any, loopIndex: number) => {
    const today: any = new Date();
    const eventDate: any = new Date(date);

    if (
      dateFormat(today, "dddd, mmmm dS, yyyy") ==
      dateFormat(eventDate, "dddd, mmmm dS, yyyy")
    ) {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(loopIndex);
      }
      return "slick-active slick-current";
    } else {
      console.log("");
    }

    // console.log("aaaaa", dateFormat(today, "dddd, mmmm dS, yyyy"));
    // console.log("bbbb", dateFormat(eventDate, "dddd, mmmm dS, yyyy"));
  };

  console.log("global", EventPopupData);

  if (eventsByDate) {
    return (
      <>
        <section className="calender-section section-padding" id="calender">
          <div className="container-fluid">
            <div className="calender-items">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="calender-text">
                    <Slide
                      cascade
                      direction="up"
                      triggerOnce="false"
                      duration="300"
                    >
                      <div className="section-title">
                        <h2>{data?.SectionTitle}</h2>
                      </div>
                      <h4>{data?.EventTitle}</h4>
                      <ReactMarkdown>{`${data?.EventDescription}`}</ReactMarkdown>
                      {/* <p>{data?.EventDescription}</p> */}
                      <div className="access-btn">
                        <Link
                          onClick={() => {
                            setWeeklyCalendar(true);
                          }}
                          activeClass="active"
                          // to="contact"
                          spy={true}
                          smooth={true}
                          // duration={100}
                          // offset={-95}
                        >
                          {data?.WeeklyText}
                        </Link>
                        <Link
                          onClick={() => {
                            setMonthlyCalendar(true);
                          }}
                          activeClass="active"
                          // to="contact"
                          spy={true}
                          smooth={true}
                          // duration={100}
                          offset={10}
                        >
                          {data?.MonthlyText}
                        </Link>
                      </div>
                    </Slide>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="event-wrap">
                    <h2>{data?.EventListTitle}</h2>
                    <Slider ref={sliderRef} {...settings}>
                      {events?.map((event: any, index: any) => (
                        <div
                          key={`event-${index}`}
                          className={`event-wrap-inner ${activeDate(
                            event[0],
                            index
                          )}`}
                        >
                          <Slide
                            cascade
                            direction="up"
                            triggerOnce="false"
                            duration="300"
                          >
                            {event[1]?.map((item: any, index: any) => (
                              <div
                                key={`eventList-${index}`}
                                className="event-item"
                                onClick={() => {
                                  setDetailsCalendar(true);
                                  setEventSignUp(true);
                                  setEeventId(item?.id);
                                }}
                              >
                                <div className="event-img">
                                  <Image
                                    width={
                                      item?.attributes?.Thumbnail?.data[0]
                                        ?.attributes?.width
                                    }
                                    height={
                                      item?.attributes?.Thumbnail?.data[0]
                                        ?.attributes?.height
                                    }
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.attributes?.Thumbnail?.data[0]?.attributes?.url}`}
                                    alt=""
                                  />
                                </div>

                                <div className="event-text">
                                  <span>
                                    {dateFormat(
                                      item?.attributes?.StartDate,
                                      "d/mm/yyyy"
                                    )}
                                  </span>

                                  <h4>
                                    <a>{item?.attributes?.Title}</a>
                                  </h4>
                                  <p>
                                    <i
                                      className="fa fa-map-marker"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {item?.attributes?.Location}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </Slide>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CalenderPopup maxWidth={400} open={open} onClose={handleClose} />
        </section>

        {monthlyCalendar && (
          <EventCalendar
            setMonthlyCalendar={setMonthlyCalendar}
            eventData={eventData}
          />
        )}

        {weeklyCalendar && (
          <WeeklyCalendar
            setWeeklyCalendar={setWeeklyCalendar}
            eventData={eventData}
          />
        )}
        {calendarDetails && (
          <CalendarDetails
            setDetailsCalendar={setDetailsCalendar}
            eventId={eventId}
          />
        )}
        {calendarDate && (
          <CalendarDate setCalendarDate={setCalendarDate} eventId={eventId} />
        )}
        {eventSignup && (
          <EventPopup
            setEventSignUp={setEventSignUp}
            EventPopupData={EventPopupData}
            global={global}
          />
        )}
      </>
    );
  } else {
    return <div>"Loading..."</div>;
  }
};

export default CalenderSection;
