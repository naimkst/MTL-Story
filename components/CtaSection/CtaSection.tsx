import Link from "next/link";
import React from "react";
import { Slide } from "react-awesome-reveal";
const CtaSection = ({ data }: any) => {
  return (
    <div className="col-lg-12">
      <div className="cta-area">
        <Slide cascade direction="up" triggerOnce={false}>
          <h2>{data?.Title}</h2>
          <Link className="theme-btn" href={String(data?.ButtonLink) || "/"}>
            {data?.ButtonText}
          </Link>
        </Slide>
      </div>
    </div>
  );
};

export default CtaSection;
