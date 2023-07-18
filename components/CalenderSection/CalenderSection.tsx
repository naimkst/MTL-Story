import React, { useState } from "react";
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

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setState(item);
  };

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
                  <Slider {...settings}>
                    {eventData?.data?.map((item: any, index: any) => (
                      <div className="event-wrap-inner">
                        <Slide
                          cascade
                          direction="up"
                          triggerOnce="false"
                          duration="500"
                        >
                          <div
                            className="event-item"
                            onClick={() => handleClickOpen("")}
                          >
                            <div className="event-img">
                              <Image
                                width={getWidth(item?.attributes?.Thumbnail)}
                                height={getHeight(item?.attributes?.Thumbnail)}
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
                          <div
                            className="event-item"
                            onClick={() => handleClickOpen("")}
                          >
                            <div className="event-img">
                              <Image src={eImg} alt="" />
                            </div>
                            <div className="event-text">
                              <span>22/06/2023</span>
                              <h4>
                                <NavLink href="/">
                                  Integer semper metus ultrices
                                </NavLink>
                              </h4>
                              <p>
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>{" "}
                                86-87 Victoria Rd, Swindon
                              </p>
                            </div>
                          </div>
                          <div
                            className="event-item"
                            onClick={() => handleClickOpen("")}
                          >
                            <div className="event-img">
                              <Image src={eImg} alt="" />
                            </div>
                            <div className="event-text">
                              <span>22/06/2023</span>
                              <h4>
                                <NavLink href="/">
                                  Integer semper metus ultrices
                                </NavLink>
                              </h4>
                              <p>
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>{" "}
                                86-87 Victoria Rd, Swindon
                              </p>
                            </div>
                          </div>
                          <div
                            className="event-item"
                            onClick={() => handleClickOpen("")}
                          >
                            <div className="event-img">
                              <Image src={eImg} alt="" />
                            </div>
                            <div className="event-text">
                              <span>22/06/2023</span>
                              <h4>
                                <NavLink href="/">
                                  Integer semper metus ultrices
                                </NavLink>
                              </h4>
                              <p>
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>{" "}
                                86-87 Victoria Rd, Swindon
                              </p>
                            </div>
                          </div>
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
};

export default CalenderSection;
