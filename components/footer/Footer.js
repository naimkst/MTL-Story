import React from 'react'
import Link from 'next/link'
import { Slide } from "react-awesome-reveal";
import Logo from '/public/images/logo.png'
import social1 from '/public/images/icon/4.svg'
import social2 from '/public/images/icon/5.svg'
import social3 from '/public/images/icon/6.svg'
import Image from 'next/image'

const Footer = (props) => {
    return (
        <div className="site-footer">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-2 col-md-2">
                        <div className="footer-about">
                            <Slide cascade direction='up' triggerOnce='false'>
                                <Link className="logo" href="/"><Image src={Logo} alt="" /></Link>
                                <ul>
                                    <li><Link href='/'><Image src={social1} alt="" /></Link></li>
                                    <li><Link href='/'><Image src={social2} alt="" /></Link></li>
                                    <li><Link href='/'><Image src={social3} alt="" /></Link></li>
                                </ul>
                            </Slide>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-10">
                        <Slide cascade direction='up' triggerOnce='false'>
                            <div className="text-widget">
                                <p>We stand by our Motto: entertain & educate first; sell second. With a steady-paced increasing community, we are creating a very strong footprint within Montreal!</p>
                            </div>
                        </Slide>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="link-widget">
                            <ul>
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <li><Link href="/">Calendar</Link></li>
                                    <li><Link href="/">Merch</Link></li>
                                    <li><Link href="/">Our Vision</Link></li>
                                    <li><Link href="/">Faq</Link></li>
                                </Slide>
                            </ul>
                            <ul>
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <li><Link href="/">Services</Link></li>
                                    <li><Link href="/">Newsletter</Link></li>
                                    <li><Link href="/">Events Calendar</Link></li>
                                    <li><Link href="/">Content Creation</Link></li>
                                </Slide>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="copyright">
                            <Slide direction='up' triggerOnce='false'>
                                <p>all rights reserved</p>
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;