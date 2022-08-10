import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <meta
            name="description"
            content="Innovative Italian Cusine and Rodizio in Lyndhurst New Jersey, Phone: 201.933.3355."
          /> */}
          <link rel="icon" href="/trattoria-assets/Artboard 6.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://api.fontshare.com/v2/css?f[]=chillax@300,400,200&display=swap"
            rel="stylesheet"
          />
          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://trattoriailcafone.com" />
          <meta name="twitter:title" content="Trattoria Il Cafone" />
          <meta
            name="twitter:description"
            content="Innovative Italian Cusine and Rodizio"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Trattoria Il Cafone" />
          <meta
            property="og:description"
            content="Innovative Italian Cusine and Rodizio"
          />
          <meta property="og:url" content="https://trattoriailcafone.com" /> */}
        </Head>
        <body className="font-Chillax">
          <Main />
          <div id="modal-root"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
