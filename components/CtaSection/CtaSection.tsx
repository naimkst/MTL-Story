import { Link } from "react-scroll";
import React from "react";
import { Slide } from "react-awesome-reveal";
const CtaSection = ({ data }: any) => {
  return (
    <div className="col-lg-12">
      <div className="cta-area">
        <Slide cascade direction="up" triggerOnce="false">
          <h2>{data?.Title}</h2>
          <Link 
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
          className="theme-btn" 
          >
            {data?.ButtonText}
          </Link>
        </Slide>
      </div>
    </div>
  );
};

export default CtaSection;
