import Link from 'next/link';
import React from 'react';

const CtaSection = () => {

    return(
        <div className="col-lg-12">
            <div className="cta-area">
                <h2>Want to work with us?</h2>
                <Link className='theme-btn' href="/">FOMO? Click here!</Link>
            </div>
        </div>
        
    )
}

export default CtaSection;
