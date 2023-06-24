import React from 'react'
import Link from 'next/link'
import icon1 from '../../public/images/icon/1.svg'
import icon2 from '../../public/images/icon/2.svg'
import icon3 from '../../public/images/icon/3.svg'
import Image from 'next/image'
import { Slide } from "react-awesome-reveal";


const Vision = (props) => {

    return (
        <section className="vision-section section-padding">
            <div className="container-fluid">
                <Slide direction='up' triggerOnce='false'>
                    <div className="section-title">
                        <h2>Our Vision</h2>
                    </div>
                </Slide>
                <div className="vision-wrap">
                    <Slide cascade direction='up' triggerOnce='false'>
                        <p>MTLStories is a leading marketing and advertisement agency servicing the local Montreal Community. We are purpose driven, to promote our fellow Montreal hard-working shops.</p>
                        <p>We stand by our Motto: entertain & educate first; sell second. With a steady-paced increasing community, we are creating a very strong footprint within Montreal! Frequently featuring unique and intriguing podcasts, posts, both informative and sometimes drop-dead-funny!</p>
                        <p>Subscribe to our channels here below , if you havent yet!</p>

                        <ul>
                            <li><Link href="#"><Image src={icon1} alt="" /></Link></li>
                            <li><Link href="#"><Image src={icon2} alt="" /></Link></li>
                            <li><Link href="#"><Image src={icon3} alt="" /></Link></li>
                        </ul>
                    </Slide>
                </div>
            </div>
        </section>
    )
}

export default Vision;