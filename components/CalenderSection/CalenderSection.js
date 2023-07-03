import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';
import eImg from '../../public/images/event.jpg'
import { Slide } from "react-awesome-reveal";
import CalenderPopup from '../CalenderPopup'

var settings = {
    dots: false,
    arrows: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    loop: false,
};

const CalenderSection = () => {

    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }

    const [state, setState] = useState({})

    const handleClickOpen = (item) => {
        setOpen(true);
        setState(item)
    }

    return (

        <section className="calender-section section-padding" id="calender">
            <div className="container-fluid">
                <div className="calender-items">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="calender-text">
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <div className="section-title">
                                        <h2>CALENDAR</h2>
                                    </div>
                                    <h4>montreal's local event calendar</h4>
                                    <p>Whether tourist or bored'ist Or just a want-to-have-fun type Check out the MTLStories calendar for all upcoming gut-lifting events</p>
                                    <div className="access-btn">
                                        <Link href="/">ACCESS OUR <br /> WEEKLY CALENDAR</Link>
                                        <Link href="/">ACCESS OUR <br /> MONTHLTY CALENDAR</Link>
                                    </div>
                                </Slide>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="event-wrap">
                                <h2>TODAY EVENT’S</h2>
                                <Slider {...settings}>
                                    <div className="event-wrap-inner">
                                        <Slide cascade direction='up' triggerOnce='false'>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                        </Slide>
                                    </div>
                                    <div className="event-wrap-inner">
                                        <Slide cascade direction='up' triggerOnce='false'>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
                                                </div>
                                            </div>
                                            <div className="event-item" onClick={() => handleClickOpen()}>
                                                <div className="event-img">
                                                    <Image src={eImg} alt="" />
                                                </div>
                                                <div className="event-text">
                                                    <span>22/06/2023</span>
                                                    <h4><Link href="/">Integer semper metus ultrices</Link></h4>
                                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> 86-87 Victoria Rd, Swindon</p>
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
            <CalenderPopup open={open} onClose={handleClose}/>
        </section>

    );
}

export default CalenderSection;