import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'


const ContactArea = (props) => {
    return (
        <section className="contact-form-area section-padding" id='contact'>
            <div className="container-fluid">
                <div className="contact-form-wrap">
                    <div className="section-title">
                        <h2>CONTACT US</h2>
                    </div>
                    <ContactForm/>
                </div>
            </div>
        </section>
    )
}

export default ContactArea;