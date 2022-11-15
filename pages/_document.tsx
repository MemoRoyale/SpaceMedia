import Document, { Head, Html, Main, NextScript } from 'next/document';


export default class _Document extends Document {

  render() {
    return (
      <Html>
        <Head>
          
          <link
            rel="shortcut icon"
            href="apple-touch-icon.png"
            type="image/x-icon"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content='#fff'/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
