import { SessionProvider } from "next-auth/react";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { TravelAppProvider } from "../components/store/travel-context";
import "../styles/globals.css";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <TravelAppProvider>
        <Component {...pageProps} />
      </TravelAppProvider>
    </SessionProvider>
  );
}

export default MyApp;
