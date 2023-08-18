import React, { use, useEffect } from "react";
import eImg from "../../public/images/product.jpg";
import Image from "next/image";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { toastTime } from "../../helpers/variables";

export const OrderSuccess = ({ setUnsubscribe }: any) => {
  const [setOrderSuccess, orderCreate] = useStore((state: any) => [
    state.setOrderSuccess,
    state.orderCreate,
  ]);

  console.log("orderCreate", orderCreate);

  const subscribe = (e: any) => {
    const isCheck = e.target.checked;
    if (isCheck) {
      const user_data = {
        username: orderCreate?.billing?.email,
        password: "1234567890",
        email: orderCreate?.billing?.email,
        first_name: orderCreate?.billing?.first_name,
        last_name: orderCreate?.billing?.last_name,
        role: "subscriber",
      };
      fetch(
        `${process.env.NEXT_PUBLIC_STORE_URL}/wp-json/custom/v1/register?consumer_key=${process.env.NEXT_PUBLIC_CUNSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CUNSUMER_SECRET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.error) {
            toast.error(String(data?.error), { autoClose: toastTime });
          } else {
            toast.success(String(data?.message), { autoClose: toastTime });
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          toast.error("Error creating user", { autoClose: toastTime });
        });
    }
  };
  return (
    <div className="calendar-box">
      <div
        className="calendarClose"
        onClick={() => {
          setOrderSuccess(false);
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
      <div className="wrapper-calendar weeklyCalendar unsubscribe">
        <div className="uns-top">
          <p>Thanks for Your Order! </p>
          <p>Your order has been successfully placed.</p>
        </div>
        <div className="uns-bottom">
          <p>
            We appreciate your business!<span>❤</span>
          </p>
        </div>

        <div className="subccessSubscription">
          <input onChange={subscribe} id="subscription" type="checkbox" />
          <label htmlFor="subscription">
            {" "}
            Stay in the loop! Subscribe to receive our latest news, offers, and
            product updates directly to your inbox.
          </label>
        </div>

        <div className="btn-wrap">
          <a
            onClick={() => {
              setOrderSuccess(false);
            }}
            className="theme-btn"
          >
            Okay
          </a>
        </div>
      </div>
    </div>
  );
};
