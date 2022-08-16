import { getSession } from "next-auth/react";
import { Header } from "../../components/Header/Header";

import { useTravelContext } from "../../components/helper-functions/useTravelContext";
import { DashboardHero } from "../../components/Hero/DashboardHero";

const DashboardHomePage = () => {
  const travelCtx = useTravelContext();

  return (
    <>
      <Header />
      <DashboardHero />
    </>
  );
};

export default DashboardHomePage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destinations: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
};
