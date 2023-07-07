import React, { Fragment } from "react";
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

const HomePage = () => {
  const {
    loading,
    error,
    data: getData,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=deep`);

  const {
    loading: globalLoading,
    error: globalError,
    data: globalData,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/global-setting?populate=deep`
  );

  const data = getData?.data?.attributes;
  const global = globalData?.data?.attributes?.Global;
  console.log("######", global);
  return (
    <Fragment>
      <Navbar global={global} />
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
