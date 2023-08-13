import React, { use, useEffect, useState } from "react";
import eImg from "../../public/images/product.jpg";
import Image from "next/image";
import { addToCart, useApi } from "../../helpers/globalFunction";
import { cartItems } from "../../hooks/cart";
import { useStore } from "../../store/store";

export const ProductDetails = ({ setProductDetails, productItem }: any) => {
  const [verient, setVariation] = useState<any>([]);
  const { data } = useApi(`products/${productItem?.id}/variations`);

  const getVeriation = (id: any) => {
    const { data: variations } = useApi(
      `products/${productItem?.id}/variations/${id}`
    );
  };

  // Function to separate attributes and their options
  function separateAttributesWithArray(variations: any) {
    const attributesMap = {};

    variations.forEach((variation: any) => {
      variation.attributes.forEach((attribute: any) => {
        const { name, option } = attribute;
        if (!attributesMap[name]) {
          attributesMap[name] = [];
        }
        if (!attributesMap[name].includes(option)) {
          attributesMap[name].push(option);
        }
      });
    });

    return attributesMap;
  }

  const attributeOptionsMap = separateAttributesWithArray(data);

  const filterDuplicateKeys = (variationData: any) => {
    const uniqueVariation: any = {};
    for (const key in variationData) {
      if (!uniqueVariation.hasOwnProperty(key)) {
        uniqueVariation[key] = variationData[key];
      }
    }
    return uniqueVariation;
  };
  const addVerient = (item: any) => {
    const key = Object.keys(item)[0];
    const existingIndex = verient.findIndex(
      (v: any) => Object.keys(v)[0] === key
    );

    if (existingIndex >= 0) {
      // If the key already exists in the array, replace the existing data
      setVariation((prevVariation: any) => [
        ...prevVariation.slice(0, existingIndex),
        item,
        ...prevVariation.slice(existingIndex + 1),
      ]);
    } else {
      // If the key does not exist, add the new data to the array
      setVariation((prevVariation: any) => [...prevVariation, item]);
    }
  };

  const [isCart, isCartActive, setIsUpdate] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
    state.setIsUpdate,
  ]);

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
        <h2>{productItem?.name}</h2>
        <div className="details-img">
          <Image
            src={productItem?.images[0]?.src}
            height={443}
            alt=""
            width={978}
          />
        </div>
        <div className="details-wrap">
          {Object.keys(attributeOptionsMap)?.map((item: any, index: number) => (
            <>
              {item == "Size" && (
                <div className="product-filter-item color filter-size">
                  <div className="color-name">
                    <span>Select {item}:</span>
                    <ul>
                      {attributeOptionsMap[item].map(
                        (option: string, optionIndex: number) => (
                          <li
                            onClick={() => {
                              addVerient({
                                [item]: option,
                              });
                            }}
                            className="color"
                            key={optionIndex}
                          >
                            <input
                              type="radio"
                              name={item}
                              value={option}
                              id={`option-${item}-${optionIndex}`}
                            />
                            <label htmlFor={`option-${item}-${optionIndex}`}>
                              {option}
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
              {item == "Color" && (
                <div className="product-filter-item color">
                  <div className="color-name">
                    <span>Select {item} :</span>
                    <ul>
                      {attributeOptionsMap["Color"]?.map(
                        (option: any, index: any) => (
                          <li
                            onClick={() => {
                              addVerient({
                                [item]: option,
                              });
                            }}
                            className={`color${index + 1}`}
                            key={index}
                          >
                            <input
                              type="radio"
                              name="color"
                              value={option}
                              id={`a${index + 1}`}
                            />
                            <label
                              style={{ background: `${option}` }}
                              htmlFor={`a${index + 1}`}
                            ></label>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="product-filter-item color">
          <div className="color-name">
            <span>Description </span>
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: productItem?.description }}
              />
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <a href="#" className="theme-btn">
            Buy Now
          </a>

          <a
            onClick={() =>
              addToCart(productItem?.id, verient, isCartActive, setIsUpdate)
            }
            className="theme-btn"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
};
