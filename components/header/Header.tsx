import Image from "next/image";
import React from "react";
import { Link } from "react-scroll";
import MobileMenu from "../MobileMenu/MobileMenu";
import Logo from "/public/images/logo.png";
import NavLink from "next/link";
import { getHeight, getImage, getWidth } from "../../helpers/globalFunction";

const Header = ({ topbarNone, hclass, global, setLanguage, language }: any) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <header
      id="header"
      className={String(topbarNone) ? String(topbarNone) : ""}
    >
      <div className="header-topbar">
        <ul>
          <li>
            {global?.NoticeTitle}{" "}
            <a href={String(global?.NoticeLink) || "/"}>
              {global?.NoticeColorTitle ? global?.NoticeColorTitle : ""}
            </a>
          </li>
          <li>
            <span
              onClick={() => setLanguage("en")}
              className={language == "en" && "active"}
            >
              EN
            </span>
            <span
              onClick={() => setLanguage("fr")}
              className={language == "fr" && "active"}
            >
              FR
            </span>
          </li>
        </ul>
      </div>
      <div className={`site-header ${hclass}`}>
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-6 col-6">
                <div className="navbar-header">
                  <NavLink
                    onClick={ClickHandler}
                    className="navbar-brand"
                    href="/"
                  >
                    <Image
                      width={getWidth(global?.Logo)}
                      height={getHeight(global?.Logo)}
                      src={getImage(global?.Logo)}
                      alt=""
                    />
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-10 col-md-1 col-1">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li>
                      <Link
                        activeClass="active"
                        to="about"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                      >
                        {global?.Menu?.AboutUs}
                      </Link>
                    </li>
                    <li>
                      <Link
                        activeClass="active"
                        to="calender"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-95}
                      >
                        {global?.Menu?.Calendar}
                      </Link>
                    </li>
                    <li>
                      <Link
                        activeClass="active"
                        to="service"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-95}
                      >
                        {global?.Menu?.Services}
                      </Link>
                    </li>
                    <li>
                      <Link
                        activeClass="active"
                        to="merch"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-95}
                      >
                        {global?.Menu?.Merch}
                      </Link>
                    </li>
                    <li>
                      <Link
                        activeClass="active"
                        to="contact"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-95}
                      >
                        {global?.Menu?.ContactUs}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-5 col-5 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
