import React from 'react'
import Image from 'next/image'
import mImg from '/public/images/merch.jpg'



const Merch = (props) => {

    return (
        <section className="merch-section section-padding" id='merch'>
            <div className="container-fluid">
                <div className="section-title text-center">
                    <h2>MERCH</h2>
                </div>
                <div className="merch-wrap">
                    <div className="merch-item">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="merch-text">
                                    <h2>Metro <br/> Series</h2>
                                    <p>Some City Inspired Merch</p>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="merch-img-wrap">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="merch-item">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="merch-text">
                                    <h2>Foodie <br/> Series</h2>
                                    <p>Some City Inspired Merch</p>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="merch-img-wrap">
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