import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mImg from "/public/images/merch.jpg";
import { Fade, Slide } from "react-awesome-reveal";
import { ProductDetails } from "./ProductDetails";
import { Checkout } from "./Checkout";
import { Unsubscribe } from "./Unsubscribe";

const Merch = ({ data }: any) => {

  const [productDetails, setProductDetails] = React.useState<any>(false);
  const [checkout, setCheckout] = React.useState<any>(false);
  const [unsubscribe, setUnsubscribe] = React.useState<any>(false);

  return (
    <>
      <section className="merch-section section-padding" id="merch">
        <div className="container-fluid">
          <Slide direction="up" triggerOnce="false">
            <div className="section-title text-center">
              <h2>{data?.SectionTitle}</h2>
            </div>
          </Slide>
          <div className="merch-wrap">
            {data?.MerchGrid?.map((item: any, index: number) => (
              <div key={`merch-${index}`} className="merch-item">
                <div className="row align-items-center">
                  <div className="col-lg-3">
                    <div className="merch-text">
                      <Slide cascade direction="left" triggerOnce="false">
                        <h2>{item?.Title}</h2>
                        <p>{item?.Subtitle}</p>
                      </Slide>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="merch-img-wrap">
                      <Fade cascade direction="up" triggerOnce="false">
                        {item?.MerchImages?.data?.map(
                          (img: any, index: number) => (
                            <div
                              key={`imgMerch-${index}`}
                              className="merch-img-item"
                              onClick={() => {
                                setProductDetails(true);
                              }}
                            >
                              <Image
                                width={img?.attributes?.width}
                                height={img?.attributes?.height}
                                src={
                                  process.env.NEXT_PUBLIC_API_BASE_URL +
                                  img?.attributes?.url
                                }
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </Fade>
                      
                    </div>
                    <div className="checkout theme-btn" onClick={() => {
                                setCheckout(true);
                              }}>checkout</div>
                    <div className="checkout theme-btn" onClick={() => {
                                setUnsubscribe(true);
                              }}>Unsubscribe</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {productDetails && (
        <ProductDetails setProductDetails={setProductDetails} />
      )}
      {checkout && (
        <Checkout setCheckout={setCheckout} />
      )}
      {unsubscribe && (
        <Unsubscribe setUnsubscribe={setUnsubscribe} />
      )}
    </>
  );
};

export default Merch;
