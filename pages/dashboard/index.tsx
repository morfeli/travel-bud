import { getSession } from "next-auth/react";
import { Header } from "../../components/Header/Header";

import { DashboardHero } from "../../components/Hero/DashboardHero";
import { UserNavigation } from "../../components/UI/UserNavigation";

const DashboardHomePage = ({ userInfo }: any) => {
  return (
    <>
      <Header />
      <DashboardHero userInfo={userInfo} />
      <UserNavigation />
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
