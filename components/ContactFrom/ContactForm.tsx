import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Fade } from "react-awesome-reveal";

const ContactForm = ({ data }: any) => {
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
  const changeHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = (e) => {
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
  };

  return (
    <form
      method="post"
      className="contact-validation-active"
      onSubmit={(e) => submitHandler(e)}
    >
      <Fade cascade direction="up" triggerOnce={false}>
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
                placeholder={data?.email}
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
              {validator.message("PHONE NUMBER", forms.phone, "required|phone")}
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
              {validator.message("DATE RELEASE", forms.date, "required|date")}
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
          </div>
        </div>
      </Fade>
    </form>
  );
};

export default ContactForm;
