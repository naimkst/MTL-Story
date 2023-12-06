import Image from "next/image";
import React from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";

export const ComingSoon = () => {
  const [password, setPassword] = React.useState<any>("");

  const {
    loading: globalLoading,
    error: globalError,
    data: globalData,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/global-setting?populate=deep&locale=en`
  );

  const data = globalData?.data?.attributes?.Password;

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (data?.Password === password) {
      Cookies.set("isPassword", password, { expires: 1 / 24 });
      window.location.href = "/";
    } else {
      alert("Wrong password");
    }
  };
  return (
    <div className="mainComing">
      <div className="comingImage">
        <Image
          src="/images/maintenance-mode.jpg"
          alt="coming soon"
          width={1920}
          height={1024}
        />
      </div>
      <div className="passwordField">
        <p className="passText">
          This page is password protected. Please enter the password to access
          this page.
        </p>
        <form action="/password" method="post" onSubmit={onSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password here"
            required
            className="passInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="passSubmitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
