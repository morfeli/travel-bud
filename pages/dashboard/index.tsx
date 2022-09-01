import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Header } from "../../components/Header/Header";
import { DashboardHero } from "../../components/Hero/DashboardHero";
import { PopularPlaces } from "../../components/UI/PopularPlaces";

import { UserNavigation } from "../../components/UI/UserNavigation";
import { useTravelContext } from "../../components/helper-functions/useTravelContext";
import { Categories } from "../../components/UI/Categories";
import { Venues } from "../../components/UI/Venues";

const DashboardHomePage = ({ userInfo }: any) => {
  const travelCtx = useTravelContext();
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

  if (isMobile) {
    return (
      <>
        <Header />
        <div
          className={
            travelCtx.darkMode
              ? "bg-darkMode text-white overflow-hidden"
              : "bg-white overflow-hidden"
          }
        >
          <DashboardHero userInfo={userInfo} />
          <Venues
            error={travelCtx.error}
            loading={travelCtx.loading}
            data={travelCtx.data}
          />
          <Categories />
          <PopularPlaces />

          <UserNavigation isMobile={isMobile} innerWidth={innerWidth} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <UserNavigation isMobile={isMobile} innerWidth={innerWidth} />
      </>
    );
  }
};

export default DashboardHomePage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const firstName = session.user.name.firstName;
    const lastName = session.user.name.lastName;
    const email = session.user.name.email;
    const userName = session.user.name.userName;
    const objectId = session.user.name.objectId;

    const userInfo = {
      firstName,
      lastName,
      email,
      userName,
      objectId,
    };

    return {
      props: { userInfo },
    };
  }
};
