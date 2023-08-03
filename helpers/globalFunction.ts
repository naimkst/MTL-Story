import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";
import CoCartAPI from "@cocart/cocart-rest-api";
import { useStore } from "../store/store";

export const CoCart = new CoCartAPI({
  url: "https://shop.mtlstories.com",
  consumerKey: "ck_5457646eb6e57aa22deaf48fed13c4609dbc8888",
  consumerSecret: "cs_181455d4bdb5f8eac3e1ce8e97b0cc0c51ef896a",
});

export const getImage = (image: any) => {
  return image?.data
    ? process.env.NEXT_PUBLIC_API_BASE_URL + image?.data?.attributes?.url
    : "";
};
export const getHeight = (image: any) => {
  return image?.data ? image?.data?.attributes?.height : 100;
};
export const getWidth = (image: any) => {
  return image?.data ? image?.data?.attributes?.width : 100;
};
export const getLocalStorageData = (key: any) => {
  try {
    let data = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    data = JSON.parse(data!);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useApi = (url: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const api = new WooCommerceRestApi({
    url: "https://shop.mtlstories.com",
    consumerKey: "ck_5457646eb6e57aa22deaf48fed13c4609dbc8888",
    consumerSecret: "cs_181455d4bdb5f8eac3e1ce8e97b0cc0c51ef896a",
    version: "wc/v3",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      api
        .get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export const addToCart = async (id: any, variation: any, isCartActive: any) => {
  const transformedData = variation?.reduce((acc: any, item: any) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    acc[`attribute_${key.toLowerCase()}`] = value;
    return acc;
  }, {});

  var data = {
    id: String(id),
    quantity: "1",
    variation: transformedData,
  };

  const cartAdd = CoCart.post("cart/add-item", data);

  const cart: any = await cartAdd;
  if (cart?.status === 200) {
    isCartActive(true);
    console.log("cartAdd@@@@@@@", cart?.data);
  }
};
