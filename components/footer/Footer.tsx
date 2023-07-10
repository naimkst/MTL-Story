import React from "react";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";
import Logo from "/public/images/logo.png";
import social1 from "/public/images/icon/4.svg";
import social2 from "/public/images/icon/5.svg";
import social3 from "/public/images/icon/6.svg";
import Image from "next/image";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";

const Footer = ({ global }: any) => {
  return (
    <div className="site-footer">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-2 col-md-2">
            <div className="footer-about">
              <Slide cascade direction="up" triggerOnce="false">
                <Link className="logo" href="/">
                  <Image
                    width={getWidth(global?.FooterLogo)}
                    height={getHeight(global?.FooterLogo)}
                    src={getImage(global?.FooterLogo)}
                    alt=""
                  />
                </Link>
                <ul>
                  {global?.SocialMedia?.Instagram && (
                    <li>
                      <Link
                        href={String(global?.SocialMedia?.Instagram) || "/"}
                      >
                        <Image src={social1} alt="" />
                      </Link>
                    </li>
                  )}

                  {global?.SocialMedia?.TikTok && (
                    <li>
                      <Link href={String(global?.SocialMedia?.TikTok) || "/"}>
                        <Image src={social2} alt="" />
                      </Link>
                    </li>
                  )}
                  {global?.SocialMedia?.Youtube && (
                    <li>
                      <Link href={String(global?.SocialMedia?.Youtube) || "/"}>
                        <Image src={social3} alt="" />
                      </Link>
                    </li>
                  )}
                </ul>
              </Slide>
            </div>
          </div>
          <div className="col-lg-5 col-md-10">
            <Slide cascade direction="up" triggerOnce="false">
              <div className="text-widget">
                <p>{global?.FooterAbout}</p>
              </div>
            </Slide>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="link-widget">
              <ul>
                <Slide cascade direction="up" triggerOnce="false">
                  {global?.FooterMenuOne?.map((item: any, index: number) => (
                    <li>
                      <Link href={String(item?.Link)}>{item?.Title}</Link>
                    </li>
                  ))}
                </Slide>
              </ul>
              <ul>
                <Slide cascade direction="up" triggerOnce="false">
                  {global?.FooterMenuTwo?.map((item: any, index: number) => (
                    <li>
                      <Link href={String(item?.Link)}>{item?.Title}</Link>
                    </li>
                  ))}
                </Slide>
              </ul>
            </div>
          </div>
          <div className="col-12">
            <div className="copyright">
              <Slide direction="up" triggerOnce="false">
                <p>{global?.CopyRightText}</p>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
