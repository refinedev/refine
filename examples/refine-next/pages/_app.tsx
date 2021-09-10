import React from "react";
import { AppProps } from "next/app";
import "@styles/global.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default MyApp;
