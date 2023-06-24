import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';


const ContactForm = () => {

    const [forms, setForms] = useState({
        cname: '',
        name: '',
        email: '',
        subject: '',
        phone: '',
        budget: '',
        date: '',
        message: ''
    });
    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        if (validator.allValid()) {
            validator.hideMessages();
            setForms({
                cname: '',
                name: '',
                email: '',
                subject: '',
                phone: '',
                budget: '',
                date: '',
                message: ''
            })
        } else {
            validator.showMessages();
        }
    };

    return (
        <form method="post" className="contact-validation-active" onSubmit={(e) => submitHandler(e)} >
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
                            placeholder="NAME OF COMPANY" />
                        {validator.message('Company Name', forms.cname, 'required|alpha_space')}
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
                            placeholder="NAME" />
                        {validator.message('name', forms.name, 'required|alpha_space')}
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
                            placeholder="Email" />
                        {validator.message('email', forms.email, 'required|email')}
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
                            placeholder="PHONE NUMBER" />
                        {validator.message('PHONE NUMBER', forms.phone, 'required|phone')}
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
                            placeholder="WISHED DATE OF RELEASE" />
                        {validator.message('DATE RELEASE', forms.date, 'required|date')}
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
                            placeholder="BUDGET" />
                        {validator.message('BUDGET', forms.budget, 'required|budget')}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="fullwidth form-group">
                        <textarea
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            value={forms.message}
                            type="text"
                            name="message"
                            className="form-control"
                            placeholder="TELL US A LITTLE ABOUT YOUR PROJECT">
                        </textarea>
                        {validator.message('message', forms.message, 'required')}
                    </div>
                </div>
                <div className="col-md-5 order-md-1 order-2 col-12">
                    <div className="submit-area">
                        <button type="submit" className="theme-btn">SEND</button>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default ContactForm;