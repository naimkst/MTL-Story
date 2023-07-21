import React, { use, useEffect } from "react";
import eImg from "../../public/images/product.jpg";
import Image from "next/image";

export const ProductDetails = ({ setProductDetails }: any) => {

  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          setProductDetails(false);
        }}
      >
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.1851 0.395264L1.27441 31.3062M1.27441 0.395264L32.1851 31.3059"
            stroke="white"
          />
        </svg>
      </div>
      <div className="wrapper-calendar weeklyCalendar productDetails">
        <h2>Integer semper metus ultrices</h2>
        <div className="details-img">
          <Image src={eImg} alt="" />
        </div>
        <div className="details-wrap">
          <div className="product-filter-item color filter-size">
            <div className="color-name">
              <span>Select Color:</span>
              <ul>
                <li className="color"><input id="sz1" type="radio" name="size" value="30" />
                  <label htmlFor="sz1">S</label>
                </li>
                <li className="color"><input id="sz2" type="radio" name="size" value="30" />
                  <label htmlFor="sz2">M</label>
                </li>
                <li className="color"><input id="sz3" type="radio" name="size" value="30" />
                  <label htmlFor="sz3">L</label>
                </li>
                <li className="color"><input id="sz4" type="radio" name="size" value="30" />
                  <label htmlFor="sz4">X</label>
                </li>
                <li className="color"><input id="sz5" type="radio" name="size" value="30" />
                  <label htmlFor="sz5">XL</label>
                </li>
                <li className="color"><input id="sz5" type="radio" name="size" value="30" />
                  <label htmlFor="sz5">XXL</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-filter-item color">
            <div className="color-name">
              <span>Select Size :</span>
              <ul>
                <li className="color1"><input id="a1" type="radio" name="color" value="30" />
                  <label htmlFor="a1"></label>
                </li>
                <li className="color2"><input id="a2" type="radio" name="color" value="30" />
                  <label htmlFor="a2"></label>
                </li>
                <li className="color3"><input id="a3" type="radio" name="color" value="30" />
                  <label htmlFor="a3"></label>
                </li>
                <li className="color4"><input id="a4" type="radio" name="color" value="30" />
                  <label htmlFor="a4"></label>
                </li>
                <li className="color5"><input id="a5" type="radio" name="color" value="30" />
                  <label htmlFor="a5"></label>
                </li>
                <li className="color6"><input id="a6" type="radio" name="color" value="30" />
                  <label htmlFor="a6"></label>
                </li>
                <li className="color7"><input id="a7" type="radio" name="color" value="30" />
                  <label htmlFor="a7"></label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-filter-item color">
          <div className="color-name">
            <span>Description </span>
            <p>Non nullam feugiat etiam in. Phasellus faucibus velit sem quis turpis ullamcorper feugiat ultricies.</p>
          </div>
        </div>
        <div className="btn-wrap">
          <a href="#" className="theme-btn">Buy Now</a>
          <a href="#" className="theme-btn">Add to Cart</a>
        </div>
      </div>
    </div>
  );
} 
