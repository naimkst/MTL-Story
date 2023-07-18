import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/animate.css";
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import "../styles/sass/style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/custom.css";
import Head from "next/head";
import "../node_modules/react-modal-video/scss/modal-video.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>MTL-Story</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
