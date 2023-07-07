import React from "react";
import ContactForm from "../ContactFrom/ContactForm";
import { Slide } from "react-awesome-reveal";

const ContactArea = ({ data }: any) => {
  console.log("Merch", data);

  return (
    <section className="contact-form-area section-padding" id="contact">
      <div className="container-fluid">
        <div className="contact-form-wrap">
          <Slide direction="up" triggerOnce={false}>
            <div className="section-title">
              <h2>{data?.SectionTitle}</h2>
            </div>
          </Slide>
          <ContactForm data={data} />
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
