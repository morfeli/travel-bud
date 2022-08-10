import { useState, useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import { LoginForm } from "../components/user-authenticate/LoginForm";
import { LoginPage } from "../components/user-authenticate/LoginPage";

const Home: NextPage = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const isMobile = innerWidth < 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>TravelBud</title>
        <meta name="description" content="User friendly travel app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPage />
    </div>
  );
};

export default Home;
