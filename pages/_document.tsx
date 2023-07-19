import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="Chillin' Buds Inventory Product Search Engine" />
        <meta name="keywords" content="CBD, Search, Engine, Chillin' Buds, Chillin Buds, ChillinBuds, Chillin' Buds CBD, Chillin Buds CBD, ChillinBuds CBD, Chillin' Buds Search, Chillin Buds Search, ChillinBuds Search, Chillin' Buds CBD Search, Chillin Buds CBD Search, ChillinBuds CBD Search, Chillin' Buds CBD Search Engine, Chillin Buds CBD Search Engine, ChillinBuds CBD Search Engine" />
        <meta name="author" content="Chillin' Buds" />  
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
