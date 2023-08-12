import React, { Fragment, useEffect } from "react";
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
import { getLocalStorageData, useApi } from "../helpers/globalFunction";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { useStore } from "../store/store";

const HomePage = () => {
  const router = useRouter();
  const [language, setLanguage] = React.useState<any>("en");
  const [isClient, setIsClient] = React.useState(false);
  const [isCart, isCartActive, isPaymnet, isPaymnetSuccess] = useStore(
    (state: any) => [
      state.isCart,
      state.isCartActive,
      state.isPaymnet,
      state.isPaymnetSuccess,
    ]
  );

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: products } = useApi("products");
  const { data: categories } = useApi("products/categories");

  //Add to cart
  useEffect(() => {
    const isSession = router?.query?.session_id;
    (async () => {
      if (isSession) {
        console.log("======", isSession);
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
        console.log("====else===", isSession);
      }
    })();
  }, [router?.query?.session_id]);

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
      />
      <ContactArea data={data?.ContactUs} />
      <Marquee data={data?.TextSlider} />
      <Footer global={global} />
      <BackToTop />
    </Fragment>
  );
};

export default HomePage;
