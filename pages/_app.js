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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Head>
          <title>MTL-Story</title>
        </Head>
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </>
  );
}

export default MyApp;
