import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useStore } from "../../store/store";

const BackToTop = () => {
  const [isCart, isCartActive] = useStore((state) => [
    state.isCart,
    state.isCartActive,
  ]);
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li onClick={() => isCartActive(true)} className="mb-2">
            <AnchorLink href="#__next">
              <i className="ti-shopping-cart"></i>
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href="#__next">
              <i className="ti-arrow-up"></i>
            </AnchorLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BackToTop;
