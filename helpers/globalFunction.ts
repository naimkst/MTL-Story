import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";

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

export const addToCart = async (id: any, variation: any) => {
  console.log("addCart", id, variation);
  // const [data, setData] = useState<any>([]);
  // const [error, setError] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setLoading(true);
  //     const saveData = await fetch(
  //       `https://shop.mtlstories.com/cart/add-item?consumer_key=ck_5457646eb6e57aa22deaf48fed13c4609dbc8888&consumer_secret=cs_181455d4bdb5f8eac3e1ce8e97b0cc0c51ef896a`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           id: id,
  //           quantity: 1,
  //           variation: variation,
  //         }),
  //       }
  //     );
  //     console.log("addCart", saveData);
  //   };
  //   fetchData();
  // }, [id]);

  // return { loading, error, data };

  const saveData = await fetch(
    `https://shop.mtlstories.com/cart/add-item?consumer_key=ck_5457646eb6e57aa22deaf48fed13c4609dbc8888&consumer_secret=cs_181455d4bdb5f8eac3e1ce8e97b0cc0c51ef896a`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        quantity: 1,
        variation: variation,
      }),
    }
  );
  console.log("addCart", await saveData);
};
