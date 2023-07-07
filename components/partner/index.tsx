import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pimg1 from "/public/images/partner/img-1.png";
import pimg2 from "/public/images/partner/img-2.png";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { getImage } from "../../helpers/globalFunction";

const PartnerSlider = ({ data }: any) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    margin: 10,
    loop: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="partners-section section-padding">
      <Slide cascade direction="up" triggerOnce={false}>
        <div className="section-title">
          <h2>{data?.SectionTitle}</h2>
        </div>
        <div className="partner-grids partners-slider">
          <Slider {...settings}>
            {data?.BrandImage?.data?.map((item: any, index: number) => (
              <div key={`brand-${index}`} className="grid">
                <Image
                  width={item?.attributes?.width}
                  height={item?.attributes?.height}
                  src={
                    process.env.NEXT_PUBLIC_API_BASE_URL + item?.attributes?.url
                  }
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>
      </Slide>
    </section>
  );
};

export default PartnerSlider;
