import React from "react";

const Marquee = ({ data }: any) => {
  return (
    <div className="digital-marque-sec">
      <div className="digital-marque">
        <div className="marquee">
          <div className="track">
            <div className="content">
              <h1>
                {data?.map((item: any, index: number) => (
                  <span key={`texSlider-${index}`}>{item?.Title}</span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
