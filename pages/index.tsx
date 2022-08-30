import type { NextPage } from "next";
import Head from "next/head";
import { LoginPage } from "../components/user-authenticate/LoginPage";

const Home: NextPage = () => {
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
