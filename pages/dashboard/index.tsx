import { getSession } from "next-auth/react";
import classNames from "classnames";
import { Header } from "../../components/Header/Header";
import { DashboardHero } from "../../components/Hero/DashboardHero";
import { PopularPlaces } from "../../components/UI/PopularPlaces";
import { Map } from "../../components/UI/Map";
import { UserNavigation } from "../../components/UI/UserNavigation";
import { useTravelContext } from "../../components/helper-functions/useTravelContext";
import { Categories } from "../../components/UI/Categories";

const DashboardHomePage = ({ userInfo }: any) => {
  const travelCtx = useTravelContext();
  return (
    <>
      <Header />
      <div className={travelCtx.darkMode ? "bg-darkMode" : "bg-white"}>
        <DashboardHero userInfo={userInfo} />
        <Categories />
        <PopularPlaces />
        <Map />
        <UserNavigation />
      </div>
    </>
  );
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
