import React, { ReactNode } from "react";
import { AppProps } from "next/app";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return <Component {...pageProps} />;
};

export default MyApp;
