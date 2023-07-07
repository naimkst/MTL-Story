import React from "react";
import Header from "../header/Header";

export default function Navbar({ hclass, Logo, topbarNone, global }: any) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header
        hclass={hclass}
        Logo={Logo}
        topbarNone={topbarNone}
        global={global}
      />
    </div>
  );
}
