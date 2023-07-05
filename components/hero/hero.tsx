import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import himg from "/public/images/video-btn.svg";
import { Link } from "react-scroll";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";

const Hero = ({ data }: any) => {
  const [isOpen, setOpen] = useState(false);

  console.log("hero", data);

  return (
    <section className="hero-section">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col col-xs-6 col-lg-6 col-12">
            <Slide triggerOnce={false}>
              <div className="hero-section-text">
                <div className="hero-title">
                  <h2>{data?.Title}</h2>
                </div>
                <div className="btns">
                  <Link href={data?.ButtonLink} className="theme-btn">
                    {data?.ButtonText}
                  </Link>
                </div>
              </div>
            </Slide>
          </div>
          <div className="col col-xs-6 col-lg-6 col-12">
            <Slide direction="right" triggerOnce={false}>
              <div className="hero-section-video">
                <div className="video-btn">
                  <button className="btn-wrap" onClick={() => setOpen(true)}>
                    {" "}
                    <Image src={himg} alt="" />{" "}
                  </button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={data?.VideoLink}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Hero;
