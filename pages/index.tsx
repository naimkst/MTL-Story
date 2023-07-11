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
import { getLocalStorageData } from "../helpers/globalFunction";

const HomePage = () => {
  const [language, setLanguage] = React.useState<any>("en");

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

  return (
    <Fragment>
      <Navbar global={global} setLanguage={handleChange} language={language} />
      <Hero data={data?.HeroSection} />
      <Marquee data={data?.TextSlider} />
      <Newslatter data={data?.Newslatter} />
      <Vision data={data?.OurVision} />
      <CalenderSection data={data?.Calendar} />
      <ServiceSection data={data?.ServiceSection} />
      <CtaSection data={data?.CTASection} />
      <FaqSection data={data?.FAQSection} />
      <PartnerSlider data={data?.BrandSection} />
      <Merch data={data?.MerchSection} />
      <ContactArea data={data?.ContactUs} />
      <Marquee data={data?.TextSlider} />
      <Footer global={global} />
      <BackToTop />
    </Fragment>
  );
};
export default HomePage;
