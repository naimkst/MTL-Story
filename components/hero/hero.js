import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import NavLink from 'next/link'
import himg from '/public/images/video-btn.svg'
import { Link } from 'react-scroll'
import Image from "next/image";

const Hero =() => {

    const [isOpen, setOpen] = useState(false)

    return (
        <section className="hero-section">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col col-xs-6 col-lg-6 col-12">
                        <div className="hero-section-text">
                            <div className="hero-title">
                                <h2>Revolutionize your approach to 20th century marketing</h2>
                            </div>
                            <div className="btns">
                                <Link className="theme-btn">FOMO? Click here!</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xs-6 col-lg-6 col-12">
                        <div className="hero-section-video">
                             <div className="video-btn">
                                <button className="btn-wrap" onClick={() => setOpen(true)}> <Image src={himg} alt="" /> </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7Jv48RQ_2gk" onClose={() => setOpen(false)} />
        </section>
    )
}

export default Hero;