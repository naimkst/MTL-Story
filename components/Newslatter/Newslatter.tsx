import Image from "next/image";
import React from "react";
import aImg from "/public/images/newslatter.png";
import { Slide } from "react-awesome-reveal";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";

const Newslatter = ({ data }: any) => {
  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <section className="newslatter-section section-padding" id="about">
      <div className="container-fluid">
        <div className="newslatter-wrap">
          <Slide direction="up" triggerOnce={false}>
            <div className="section-title">
              <h2>{data?.SectionTitle}</h2>
            </div>
          </Slide>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <Slide direction="left" triggerOnce={false}>
                <div className="newslatter-img">
                  <Image
                    width={Number(getWidth(data?.NewsImage))}
                    height={Number(getHeight(data?.NewsImage))}
                    src={getImage(data?.NewsImage)}
                    alt=""
                  />
                </div>
              </Slide>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <Slide direction="right" triggerOnce={false}>
                <div className="newslatter-text">
                  <h2>{data?.Title}</h2>

                  <form onSubmit={submitHandler}>
                    <div className="input-group">
                      <input type="text" placeholder="enter your email" />
                      <button type="submit" className="theme-btn">
                        {data?.ButtonText}
                      </button>
                    </div>
                  </form>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newslatter;
