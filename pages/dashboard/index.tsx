import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../components/helper-functions/HelperFunctions";

import { Header } from "../../components/Header/Header";
import { DashboardHero } from "../../components/Hero/DashboardHero";
import { PopularPlaces } from "../../components/UI/PopularPlaces";

import { UserNavigation } from "../../components/UI/UserNavigation";
import { useTravelContext } from "../../components/helper-functions/useTravelContext";
import { Categories } from "../../components/UI/Categories";
import { Venues } from "../../components/UI/Venues";
import classNames from "classnames";
import { SavedProfilePage } from "../../components/Hero/SavedProfilePage";

const DashboardHomePage = ({ userInfo, length, savedVenueData }: any) => {
  const travelCtx = useTravelContext();
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const isMobile = innerWidth < 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  const pageStyles = classNames("bg-slate-100", "overflow-hidden", {
    "text-white": travelCtx.darkMode,
    "bg-[#595959]": travelCtx.darkMode,
  });

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
        {travelCtx.activeTab === "Home" && (
          <div className={pageStyles}>
            <h1>User profile</h1>
          </div>
        )}
        {travelCtx.activeTab === "Save" && (
          <div className={pageStyles}>
            <SavedProfilePage length={length} data={savedVenueData} />
          </div>
        )}
        {travelCtx.activeTab === "Compass" && (
          <div className={pageStyles}>
            <DashboardHero
              userInfo={userInfo}
              isMobile={isMobile}
              innerWidth={innerWidth}
            />
            <Venues
              error={travelCtx.error}
              loading={travelCtx.loading}
              data={travelCtx.data}
              email={userInfo.email}
              objectID={userInfo.objectId}
            />
            <Categories isMobile={isMobile} innerWidth={innerWidth} />
            <PopularPlaces />
          </div>
        )}
        <UserNavigation isMobile={isMobile} innerWidth={innerWidth} />
      </>
    );
  } else {
    return (
      <>
        <Header />

        <div
          className={
            travelCtx.darkMode
              ? "bg-darkMode text-white overflow-hidden flex"
              : "bg-white overflow-hidden flex"
          }
        >
          <UserNavigation isMobile={isMobile} innerWidth={innerWidth} />
          {travelCtx.activeTab === "Home" && (
            <div className="flex flex-col w-screen">
              <p>Home page</p>
            </div>
          )}
          {travelCtx.activeTab === "Save" && (
            <div>
              <SavedProfilePage length={length} data={savedVenueData} />
            </div>
          )}
          {travelCtx.activeTab === "Compass" && (
            <div className="flex flex-col justify-between w-screen h-screen px-4 overflow-y-scroll">
              <DashboardHero
                userInfo={userInfo}
                isMobile={isMobile}
                innerWidth={innerWidth}
              />
              <Venues
                error={travelCtx.error}
                loading={travelCtx.loading}
                data={travelCtx.data}
                email={userInfo.email}
                objectID={userInfo.objectId}
              />
              <Categories isMobile={isMobile} innerWidth={innerWidth} />
              <PopularPlaces />
            </div>
          )}
        </div>
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

    const savedVenue: any = [];

    const client = await connectToDatabase();

    await client
      .db("morfeli-travelbud")
      .collection("saved-venues")
      .find()
      .forEach((post): any => savedVenue.push(post));

    const length = savedVenue[0].savedVenues.length;

    const savedVenueData = JSON.parse(JSON.stringify(savedVenue));

    return {
      props: { userInfo, savedVenueData, length },
    };
  }
};
