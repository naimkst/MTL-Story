import React from 'react'
import Image from 'next/image'
import mImg from '/public/images/merch.jpg'
import { Fade, Slide } from "react-awesome-reveal";


const Merch = (props) => {

    return (
        <section className="merch-section section-padding" id='merch'>
            <div className="container-fluid">
                <Slide direction='up' triggerOnce='false'>
                    <div className="section-title text-center">
                        <h2>MERCH</h2>
                    </div>
                </Slide>
                <div className="merch-wrap">
                    <div className="merch-item">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="merch-text">
                                    <Slide cascade direction='left' triggerOnce='false'>
                                        <h2>Metro <br /> Series</h2>
                                        <p>Some City Inspired Merch</p>
                                    </Slide>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="merch-img-wrap">
                                    <Fade cascade direction='up' triggerOnce='false'>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="merch-item">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="merch-text">
                                    <Slide cascade direction='left' triggerOnce='false'>
                                        <h2>Foodie <br /> Series</h2>
                                        <p>Some City Inspired Merch</p>
                                    </Slide>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="merch-img-wrap">
                                    <Fade cascade direction='up' triggerOnce='false'>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                        <div className="merch-img-item">
                                            <Image src={mImg} alt="" />
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Merch;