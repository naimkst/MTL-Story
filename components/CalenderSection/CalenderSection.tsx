import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import eImg from "../../public/images/event.jpg";
import { Slide } from "react-awesome-reveal";
import CalenderPopup from "../CalenderPopup";

var settings = {
  dots: false,
  arrows: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  loop: false,
};

const CalenderSection = ({ data }: any) => {
  const [open, setOpen] = React.useState<any>(false);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setState(item);
  };

  return (
    <section className="calender-section section-padding" id="calender">
      <div className="container-fluid">
        <div className="calender-items">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="calender-text">
                <Slide cascade direction="up" triggerOnce={false}>
                  <div className="section-title">
                    <h2>{data?.SectionTitle}</h2>
                  </div>
                  <h4>{data?.EventTitle}</h4>
                  <p>{data?.EventDescription}</p>
                  <div className="access-btn">
                    <Link href={String(data?.WeeklyLink) || "/"}>
                      {data?.WeeklyText}
                    </Link>
                    <Link href={String(data?.MonthlyLink) || "/"}>
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
                  <div className="event-wrap-inner">
                    <Slide cascade direction="up" triggerOnce={false}>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                  <div className="event-wrap-inner">
                    <Slide cascade direction="up" triggerOnce={false}>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                            <Link href="/">Integer semper metus ultrices</Link>
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
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CalenderPopup maxWidth={400} open={open} onClose={handleClose} />
    </section>
  );
};

export default CalenderSection;
