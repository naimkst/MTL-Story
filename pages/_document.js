import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8rABHUTrfNmv_H8tq2Cm5eupUv5_DvYg&libraries=places"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
