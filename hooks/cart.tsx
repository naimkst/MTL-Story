import React from "react";
import { CoCart } from "../helpers/globalFunction";

export const cartItems = () => {
  const [data, setData] = React.useState<any>(null);
  CoCart.get("cart/items")
    .then((response) => {
      setData(Object.entries(response.data));
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
      console.log("Response Data:", error.response.data);
    })
    .finally(() => {
      // Always executed.
    });
  return data;
};

export const cart = () => {
  let cartItems: any = [];
  const [data, setData] = React.useState<any>(null);
  CoCart.get("cart")
    .then((response) => {
      setData(Object.entries(response.data));
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
      console.log("Response Data:", error.response.data);
    })
    .finally(() => {
      // Always executed.
    });
  return data ? data : [];
};
