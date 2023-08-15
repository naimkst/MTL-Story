import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mImg from "/public/images/merch.jpg";
import { Fade, Slide } from "react-awesome-reveal";
import { ProductDetails } from "./ProductDetails";
import { Checkout } from "./Checkout";
import { Unsubscribe } from "./Unsubscribe";
import { useStore } from "../../store/store";
import { OrderSuccess } from "./OrderSuccess";

const Merch = ({
  data,
  products,
  categories,
  setCoupon,
  couponApply,
  setCartItemRemove,
}: any) => {
  const [productDetails, setProductDetails] = React.useState<any>(false);
  const [checkout, setCheckout] = React.useState<any>(false);
  const [unsubscribe, setUnsubscribe] = React.useState<any>(false);
  const [productItem, setProductItem] = React.useState<any>(null);

  const [isCart, orderSuccess, singleProduct, setSingleProduct] = useStore(
    (state: any) => [
      state.isCart,
      state.orderSuccess,
      state.singleProduct,
      state.setSingleProduct,
    ]
  );

  const findCategory = (cat: any, prdCat: any) => {
    const catName = prdCat?.categories?.find(
      (item: any) => item?.id === cat?.id
    );
    if (catName) {
      return true;
    } else {
      return false;
    }
  };
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
            {categories?.map(
              (item: any, index: number) =>
                item?.count > 0 && (
                  <div key={`merch-${index}`} className="merch-item">
                    <div className="row align-items-center">
                      <div className="col-lg-3">
                        <div className="merch-text">
                          <Slide cascade direction="left" triggerOnce="false">
                            <h2>{item?.name}</h2>
                            <p>{item?.description}</p>
                          </Slide>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="merch-img-wrap">
                          <Fade cascade direction="up" triggerOnce="false">
                            {products?.map((img: any, index: number) => (
                              <>
                                {findCategory(item, img) == true && (
                                  <div
                                    key={`imgMerch-${index}`}
                                    className="merch-img-item"
                                    onClick={() => {
                                      setSingleProduct(true);
                                      setProductItem(img);
                                    }}
                                  >
                                    <Image
                                      width={312}
                                      height={208}
                                      style={{ objectFit: "cover" }}
                                      src={img?.images[0]?.src}
                                      className="merchImage"
                                      alt=""
                                    />
                                    <span className="catName">
                                      {img?.categories[0]?.name}
                                    </span>
                                  </div>
                                )}
                              </>
                            ))}
                          </Fade>
                        </div>
                        {/* <div
                          className="checkout theme-btn"
                          onClick={() => {
                            setCheckout(true);
                          }}
                        >
                          checkout
                        </div> */}
                        {/* <div
                          className="checkout theme-btn"
                          onClick={() => {
                            setUnsubscribe(true);
                          }}
                        >
                          Unsubscribe
                        </div> */}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </section>
      {singleProduct && (
        <ProductDetails
          setProductDetails={setProductDetails}
          productItem={productItem}
        />
      )}
      {isCart && (
        <Checkout
          setCheckout={setCheckout}
          setCoupon={setCoupon}
          couponApply={couponApply}
          setCartItemRemove={setCartItemRemove}
        />
      )}
      {unsubscribe && <Unsubscribe setUnsubscribe={setUnsubscribe} />}
      {orderSuccess && <OrderSuccess setUnsubscribe={setUnsubscribe} />}
    </>
  );
};

export default Merch;
