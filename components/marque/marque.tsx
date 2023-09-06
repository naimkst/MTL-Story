import React from "react";
import Marque from "react-fast-marquee";

const Marquee = ({ data }: any) => {
  return (
    <div className="digital-marque-sec">
      <div className="digital-marque">
        <div className="">
          <div className="">
            <div className="content">
              <h1>
                <Marque gradient={false} speed={90} loop={0}>
                  {data?.map((item: any, index: number) => (
                    <span key={`texSlider-${index}`}>{item?.Title}</span>
                  ))}
                </Marque>
                {/* {data?.map((item: any, index: number) => (
                  <span key={`texSlider-${index}`}>{item?.Title}</span>
                ))} */}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
