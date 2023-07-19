import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Fade } from "react-awesome-reveal";

const ContactForm = ({ data }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState(false);
  const [submitErrMsg, setSubmitErrMsg] = React.useState(false);
  const [forms, setForms] = useState({
    cname: "",
    name: "",
    email: "",
    subject: "",
    phone: "",
    budget: "",
    date: "",
    message: "",
  });

  const [validator] = useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );
  const changeHandler = (e: any) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (validator.allValid()) {
      validator.hideMessages();
      setForms({
        cname: "",
        name: "",
        email: "",
        subject: "",
        phone: "",
        budget: "",
        date: "",
        message: "",
      });
    } else {
      validator.showMessages();
    }

    const formData = {};
    Array.from(e.target.elements).forEach((field: any) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    const sendMail = fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success === true) {
          setSubmitMessage(true);
        } else {
          setSubmitErrMsg(true);
        }
        console.log(data);
      });
  };

  return (
    <form
      method="post"
      className="contact-validation-active"
      onSubmit={(e) => submitHandler(e)}
    >
      <Fade cascade direction="up" triggerOnce="false">
        <div className="row align-items-center">
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.cname}
                type="text"
                name="cname"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.Company}
              />
              {validator.message(
                "Company Name",
                forms.cname,
                "required|alpha_space"
              )}
            </div>
          </div>
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.name}
                type="text"
                name="name"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.Name}
              />
              {validator.message("name", forms.name, "required|alpha_space")}
            </div>
          </div>
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.email}
                type="email"
                name="email"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.Email}
              />
              {validator.message("email", forms.email, "required|email")}
            </div>
          </div>
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.phone}
                type="text"
                name="phone"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.Phone}
              />
              {validator.message("PHONE NUMBER", forms.phone, "required")}
            </div>
          </div>
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.date}
                type="text"
                name="date"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.WishDate}
              />
              {validator.message("DATE RELEASE", forms.date, "required")}
            </div>
          </div>
          <div className="col-md-6 col-md-6 col-12">
            <div className="form-group">
              <input
                value={forms.budget}
                type="text"
                name="budget"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="form-control"
                placeholder={data?.Budget}
              />
              {validator.message("BUDGET", forms.budget, "required|budget")}
            </div>
          </div>
          <div className="col-md-12">
            <div className="fullwidth form-group">
              <textarea
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                value={forms.message}
                name="message"
                className="form-control"
                placeholder={data?.Description}
              ></textarea>
              {validator.message("message", forms.message, "required")}
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-12">
            <div className="submit-area">
              <button type="submit" className="theme-btn">
                {data?.ButtonText}
              </button>
            </div>
            <div>
              {submitMessage && (
                <p className="">
                  Thanks for contacting us! We will get back to you soon.
                </p>
              )}
              {submitErrMsg && (
                <p className="text-danger">
                  Thanks for contacting us! We will get back to you soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </form>
  );
};

export default ContactForm;
