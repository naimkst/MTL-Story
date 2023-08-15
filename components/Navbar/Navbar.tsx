import React from "react";
import Header from "../header/Header";

export default function Navbar({
  hclass,
  Logo,
  topbarNone,
  global,
  setLanguage,
  language,
}: any) {
  const [scroll, setScroll] = React.useState(0);

  if (typeof window !== "undefined") {
    var handleScroll = () => setScroll(document.documentElement.scrollTop);
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header
        hclass={hclass}
        setLanguage={setLanguage}
        Logo={Logo}
        topbarNone={topbarNone}
        global={global}
        language={language}
      />
    </div>
  );
}
