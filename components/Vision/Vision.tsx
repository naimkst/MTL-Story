import React from "react";
import Link from "next/link";
import icon1 from "../../public/images/icon/1.svg";
import icon2 from "../../public/images/icon/2.svg";
import icon3 from "../../public/images/icon/3.svg";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Vision = ({ data }: any) => {
  return (
    <section className="vision-section section-padding" id="about">
      <div className="container-fluid">
        <Slide direction="up" triggerOnce="false">
          <div className="section-title">
            <h2>{data?.SectionTitle}</h2>
          </div>
        </Slide>
        <div className="vision-wrap">
          <Slide cascade direction="up" triggerOnce="false" duration="500">
            {data?.Description}

            <div>
              <ReactMarkdown>{`${data?.Description}`}</ReactMarkdown>
            </div>

            <ul>
              {data?.SocialMedia?.Instagram && (
                <li>
                  <Link href={String(data?.SocialMedia?.Instagram) || "/"}>
                    <Image src={icon1} alt="" />
                  </Link>
                </li>
              )}

              {data?.SocialMedia?.TikTok && (
                <li>
                  <Link href={String(data?.SocialMedia?.TikTok) || "/"}>
                    <Image src={icon2} alt="" />
                  </Link>
                </li>
              )}
              {data?.SocialMedia?.Youtube && (
                <li>
                  <Link href={String(data?.SocialMedia?.Youtube) || "/"}>
                    <Image src={icon3} alt="" />
                  </Link>
                </li>
              )}
            </ul>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default Vision;
