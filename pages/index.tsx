import React, { Fragment, use, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ContactArea from "../components/ContactArea";
import Hero from "../components/hero/hero";
import Marquee from "../components/marque/marque";
import Newslatter from "../components/Newslatter/Newslatter";
import Vision from "../components/Vision/Vision";
import CalenderSection from "../components/CalenderSection/CalenderSection";
import ServiceSection from "../components/ServiceSection/ServiceSection";
import CtaSection from "../components/CtaSection/CtaSection";
import FaqSection from "../components/FaqSection/FaqSection";
import PartnerSlider from "../components/partner";
import Merch from "../components/Merch/Merch";
import BackToTop from "../components/backToTop/backToTop";
import Footer from "../components/footer/Footer";
import useFetch from "../hooks/useFetch";
import { CoCart, getLocalStorageData, useApi } from "../helpers/globalFunction";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { useStore } from "../store/store";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader";

const HomePage = () => {
  const router = useRouter();
  const [language, setLanguage] = React.useState<any>("en");
  const [updateCupon, setUpdateCupon] = React.useState<any>(false);
  const [coupon, setCoupon] = React.useState<any>("");
  const [cartItemRemove, setCartItemRemove] = React.useState<any>("");

  const [
    isCart,
    isCartActive,
    isPaymnet,
    isPaymnetSuccess,
    setCartItems,
    isUpdate,
    orderCreate,
    orderSuccess,
    singleProduct,
    setSingleProduct,
  ] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
    state.isPaymnet,
    state.isPaymnetSuccess,
    state.setCartItems,
    state.isUpdate,
    state.orderCreate,
    state.orderSuccess,
    state.singleProduct,
    state.setSingleProduct,
  ]);

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });

  const lngData = getLocalStorageData("lan");

  const {
    loading,
    error,
    data: getData,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=deep&locale=${lngData}`
  );

  const {
    loading: globalLoading,
    error: globalError,
    data: globalData,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/global-setting?populate=deep&locale=${lngData}`
  );

  const {
    loading: eventLoading,
    error: enventError,
    data: envetData,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?populate=deep&locale=${lngData}`
  );

  const data = getData?.data?.attributes;
  const global = globalData?.data?.attributes?.Global;

  const handleChange = (event: any) => {
    setLanguage(event);
    localStorage.setItem("lan", JSON.stringify(event));
  };

  useEffect(() => {
    if (lngData) {
      setLanguage(lngData);
    } else {
      localStorage.setItem("lan", JSON.stringify("en"));
      setLanguage("en");
    }
  }, [lngData]);

  const { data: products } = useApi("products");
  const { data: categories } = useApi("products/categories");

  //Add to cart
  useEffect(() => {
    const isSession = router?.query?.session_id;
    (async () => {
      if (isSession) {
        try {
          const retrievedSession = await stripe.checkout.sessions.retrieve(
            String(router?.query?.session_id)
          );

          if (retrievedSession?.payment_intent) {
            isCartActive(true);
            isPaymnetSuccess(retrievedSession);
            console.log("Retrieved Session:", retrievedSession);
            // isCartActive(false);
          }
        } catch (error) {
          console.error("Error retrieving session:", error);
        }
      } else {
        console.log(isSession);
      }
    })();
  }, [router?.query?.session_id]);

  // toast.success("Wow so easy!");

  const couponApply = async () => {
    try {
      const couponGet = await fetch(
        `${process.env.NEXT_PUBLIC_STORE_URL}/cart/?wt_coupon=${coupon}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          toast.success("Coupon applied successfully", { autoClose: 800 });
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return null;
        });
      setUpdateCupon(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    try {
      CoCart.get("cart")
        .then((response) => {
          setCartItems(
            Object.entries(response.data) ? Object.entries(response.data) : []
          );
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
    } catch (error) {
      console.log("error", error);
    }
  }, [updateCupon, cartItemRemove, isUpdate, orderCreate]);

  useEffect(() => {
    isCartActive(false);
    setSingleProduct(false);
  }, [orderSuccess]);

  if (loading || data === undefined || globalLoading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Navbar global={global} setLanguage={handleChange} language={language} />
      <Hero data={data?.HeroSection} />
      <Marquee data={data?.TextSlider} />
      <Newslatter data={data?.Newslatter} />
      <Vision data={data?.OurVision} />
      <CalenderSection data={data?.Calendar} eventData={envetData} />
      <ServiceSection data={data?.ServiceSection} />
      <CtaSection data={data?.CTASection} />
      <FaqSection data={data?.FAQSection} />
      <PartnerSlider data={data?.BrandSection} />
      <Merch
        data={data?.MerchSection}
        products={products}
        categories={categories}
        setCoupon={setCoupon}
        couponApply={couponApply}
        setCartItemRemove={setCartItemRemove}
      />
      <ContactArea data={data?.ContactUs} />
      <Marquee data={data?.TextSlider} />
      <Footer global={global} />
      <BackToTop />
    </Fragment>
  );
};

export default HomePage;
