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
import { SavedProfilePage } from "../../components/Hero/SavedProfilePage";
import { UserProfilePage } from "../../components/Hero/UserProfilePage";

import classNames from "classnames";

const DashboardHomePage = ({
  userInfo,
  length,
  savedVenueData,
  savedUserPosts,
}: any) => {
  const travelCtx = useTravelContext();
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const isMobile = innerWidth < 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  const pageStyles = classNames("bg-slate-100", "overflow-hidden pb-4", {
    "text-darkpurpleThree": travelCtx.darkMode,
    "bg-[#121212]": travelCtx.darkMode,
  });

  const desktopPageStyles = classNames(
    "bg-slate-100",
    "overflow-hidden",
    "flex",
    {
      "text-darkpurpleThree": travelCtx.darkMode,
      "bg-[#121212]": travelCtx.darkMode,
    }
  );

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
            <UserProfilePage data={savedUserPosts} />
          </div>
        )}
        {travelCtx.activeTab === "Save" && (
          <div className={pageStyles}>
            <SavedProfilePage
              length={length}
              data={savedVenueData}
              username={userInfo.userName}
              objectID={userInfo.objectId}
            />
          </div>
        )}
        {travelCtx.activeTab === "Compass" && (
          <div className={pageStyles}>
            <DashboardHero userInfo={userInfo} isMobile={isMobile} />
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

        <div className={desktopPageStyles}>
          <UserNavigation isMobile={isMobile} innerWidth={innerWidth} />
          {travelCtx.activeTab === "Home" && (
            <div className="flex flex-col justify-between w-screen h-screen overflow-y-scroll">
              <UserProfilePage data={savedUserPosts} />
            </div>
          )}
          {travelCtx.activeTab === "Save" && (
            <div className="flex justify-center w-full">
              <SavedProfilePage
                length={length}
                data={savedVenueData}
                username={userInfo.userName}
                objectID={userInfo.objectId}
              />
            </div>
          )}
          {travelCtx.activeTab === "Compass" && (
            <div className="flex flex-col justify-between w-screen h-screen overflow-y-scroll">
              <DashboardHero userInfo={userInfo} isMobile={isMobile} />
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

    let savedVenue: any = [];
    let userPosts: any = [];
    let length: number = 0;

    const client = await connectToDatabase();

    const collection = await client
      .db("morfeli-travelbud")
      .collection("saved-venues")
      .findOne({ userID: objectId });

    await client
      .db("morfeli-travelbud")
      .collection("user-posts")
      .find()
      .forEach((post) => userPosts.push(post));

    if (!collection) {
      savedVenue = [];
      length = 0;
    } else {
      savedVenue.push(collection);
      length = savedVenue[0].savedVenues.length;
    }

    const savedVenueData = JSON.parse(JSON.stringify(savedVenue));
    const savedUserPosts = JSON.parse(JSON.stringify(userPosts));

    return {
      props: { userInfo, savedVenueData, length, savedUserPosts },
    };
  }
};
