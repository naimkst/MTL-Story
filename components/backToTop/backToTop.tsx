import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useStore } from "../../store/store";

const BackToTop = () => {
  const [isCart, isCartActive, cartItems] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
    state.cartItems,
  ]);
  const items = cartItems?.[4];
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li onClick={() => isCartActive(true)} className="mb-2">
            {items?.[1]?.length > 0 && (
              <span className="cartCount">{items?.[1]?.length}</span>
            )}
            <a>
              <i
                style={{ color: "#fff", cursor: "pointer" }}
                className="ti-shopping-cart"
              ></i>
            </a>
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
