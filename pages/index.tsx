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
      <div className="text-center">
        <h2 className="text-xl">Dummy Credentials</h2>

        <p className="py-2">Email: test@gmail.com</p>
        <p>Password: testtesttest</p>
      </div>
    </div>
  );
};

export default Home;
