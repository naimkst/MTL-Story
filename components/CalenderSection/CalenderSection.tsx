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
import dateFormat, { masks } from "dateformat";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";

var settings = {
  dots: false,
  arrows: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  loop: false,
};

const CalenderSection = ({ data, eventData }: any) => {
  const [open, setOpen] = React.useState<any>(false);
  const [monthlyCalendar, setMonthlyCalendar] = React.useState<any>(false);
  const [weeklyCalendar, setWeeklyCalendar] = React.useState<any>(false);
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

  console.log("=========", events);

  useEffect(() => {
    if (eventsByDate) {
      const sortedDates = Object.entries(eventsByDate).sort();
      setEvents(sortedDates);
    } else {
      setEvents(eventsByDate);
    }
    // if (sliderRef.current) {
    //   sliderRef.current.slickGoTo(2);
    // }
  }, [eventData]);

  const activeDate = (date: any, loopIndex: number) => {
    const today: any = new Date();
    const eventDate: any = new Date(date);

    if (
      dateFormat(today, "dddd, mmmm dS, yyyy") ==
      dateFormat(eventDate, "dddd, mmmm dS, yyyy")
    ) {
      console.log(loopIndex, date);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(loopIndex);
      }
      return "slick-active slick-current";
    } else {
      console.log("false");
    }

    console.log("aaaaa", dateFormat(today, "dddd, mmmm dS, yyyy"));
    console.log("bbbb", dateFormat(eventDate, "dddd, mmmm dS, yyyy"));
  };

  if (eventsByDate) {
    return (
      <>
        <section className="calender-section section-padding" id="calender">
          <div className="container-fluid">
            <div className="calender-items">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="calender-text">
                    <Slide cascade direction="up" triggerOnce="false">
                      <div className="section-title">
                        <h2>{data?.SectionTitle}</h2>
                      </div>
                      <h4>{data?.EventTitle}</h4>
                      <p>{data?.EventDescription}</p>
                      <div className="access-btn">
                        <Link
                          onClick={() => {
                            setWeeklyCalendar(true);
                          }}
                          activeClass="active"
                          // to="contact"
                          spy={true}
                          smooth={true}
                          duration={500}
                          offset={-95}
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
                          duration={500}
                          offset={-95}
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
                            duration="500"
                          >
                            {event[1]?.map((item: any, index: any) => (
                              <div
                                key={`eventList-${index}`}
                                className="event-item"
                                onClick={() => handleClickOpen("")}
                              >
                                <div className="event-img">
                                  <Image
                                    width={getWidth(
                                      item?.attributes?.Thumbnail
                                    )}
                                    height={getHeight(
                                      item?.attributes?.Thumbnail
                                    )}
                                    src={getImage(item?.attributes?.Thumbnail)}
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
                                    <NavLink href="/">
                                      {item?.attributes?.Title}
                                    </NavLink>
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
          <EventCalendar setMonthlyCalendar={setMonthlyCalendar} />
        )}

        {weeklyCalendar && (
          <WeeklyCalendar setWeeklyCalendar={setWeeklyCalendar} />
        )}
      </>
    );
  } else {
    return "Loading...";
  }
};

export default CalenderSection;
