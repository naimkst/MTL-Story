import Image from "next/image";
import React from "react";
import { Slide } from "react-awesome-reveal";
import { encode } from "base-64";
import {
  getHeight,
  getImage,
  getWidth,
  isValidEmail,
  shopAPi,
} from "../../helpers/globalFunction";
import { toast } from "react-toastify";

const Newslatter = ({ data }: any) => {
  const [email, setEmail] = React.useState<any>("");
  const [loading, setLoading] = React.useState<any>(false);
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const subscribeHandle = () => {
      const user_data = {
        username: email,
        password: "1234567890",
        email: email,
        first_name: "",
        last_name: "",
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
            toast.error(String(data?.error));
            setLoading(false);
          } else {
            toast.success(String(data?.message));
            setEmail("");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          toast.error("Error creating user");
          setLoading(false);
        });
    };
    const validEmail = isValidEmail(email);

    if (validEmail && email !== "") {
      subscribeHandle();
    } else {
      toast.error("Please enter valid email");
      setLoading(false);
    }
  };

  return (
    <section className="newslatter-section section-padding">
      <div className="container-fluid">
        <div className="newslatter-wrap">
          <Slide direction="up" triggerOnce="false">
            <div className="section-title">
              <h2>{data?.SectionTitle}</h2>
            </div>
          </Slide>
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 col-12">
              <Slide direction="left" triggerOnce="false">
                <div className="newslatter-img">
                  <Image
                    width={Number(getWidth(data?.NewsImage))}
                    height={Number(getHeight(data?.NewsImage))}
                    src={getImage(data?.NewsImage)}
                    alt=""
                  />
                </div>
              </Slide>
            </div>
            <div className="col-lg-7 col-md-12 col-12">
              <Slide direction="right" triggerOnce="false">
                <div className="newslatter-text">
                  <h2>{data?.Title}</h2>

                  <form onSubmit={submitHandler}>
                    <div className="input-group">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="enter your email"
                        value={email}
                      />
                      <button type="submit" className="theme-btn">
                        {loading ? "Loading.." : data?.ButtonText}
                      </button>
                    </div>
                  </form>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newslatter;
