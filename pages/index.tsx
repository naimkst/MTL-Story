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
  const { loading, error, data } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=deep`
  );

  console.log(data);
  return (
    <Fragment>
      <Navbar />
      <Hero />
      <Marquee />
      <Newslatter />
      <Vision />
      <CalenderSection />
      <ServiceSection />
      <CtaSection />
      <FaqSection />
      <PartnerSlider />
      <Merch />
      <ContactArea />
      <Marquee />
      <Footer />
      <BackToTop />
    </Fragment>
  );
};
export default HomePage;
