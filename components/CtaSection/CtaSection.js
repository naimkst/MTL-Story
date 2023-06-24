import Link from 'next/link';
import React from 'react';
import { Slide } from "react-awesome-reveal";
const CtaSection = () => {

    return (
        <div className="col-lg-12">
            <div className="cta-area">
                <Slide cascade direction='up' triggerOnce='false'>
                    <h2>Want to work with us?</h2>
                    <Link className='theme-btn' href="/">FOMO? Click here!</Link>
                </Slide>
            </div>
        </div>

    )
}

export default CtaSection;
