import Image from 'next/image';
import React from 'react'
import aImg from '/public/images/newslatter.png'

const Newslatter = (props) => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (

        <section className="newslatter-section section-padding" id='about'>
            <div className="container-fluid">
                <div className="newslatter-wrap">
                    <div className="section-title">
                        <h2>NEWSLETTER</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="newslatter-img">
                                <Image src={aImg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="newslatter-text">
                                <h2>MTLSTORIES WEEKLY NEWSLETTER</h2>

                                <form onSubmit={submitHandler}>
                                    <div className="input-group">
                                        <input type="text" placeholder='enter your email'/>
                                        <button type='submit' className='theme-btn'>subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newslatter;