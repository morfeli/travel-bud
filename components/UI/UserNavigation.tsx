import { useState, useEffect } from "react";

import { CompassSVG } from "../Icons/CompassSVG";
import { HomeSVG } from "../Icons/HomeSVG";
import { SaveSVG } from "../Icons/SaveSVG";

type UserNavigationProps = {
  isMobile: boolean;
  innerWidth: number;
};

export interface ActiveTab {
  activeTab: string;
  value: string;
  setTab: (value: string) => void;
}

export const UserNavigation = ({
  isMobile,
  innerWidth,
}: UserNavigationProps) => {
  const [activeTab, setActiveTab] = useState("Home");

  const setActiveTabHandler = (value: string) => {
    setActiveTab(value);
  };

  if (isMobile) {
    return (
      <section className="fixed bottom-0 flex justify-around w-screen p-4 mt-4 rounded-t-2xl bg-darkpurpleTwo">
        <HomeSVG
          activeTab={activeTab}
          value="Home"
          setTab={setActiveTabHandler}
        />
        <SaveSVG
          activeTab={activeTab}
          value="Save"
          setTab={setActiveTabHandler}
        />
        <CompassSVG
          activeTab={activeTab}
          value="Compass"
          setTab={setActiveTabHandler}
        />
      </section>
    );
  } else {
    return (
      <section className="flex flex-col justify-around w-16 h-screen p-4 bg-darkPurpleFour">
        <HomeSVG
          activeTab={activeTab}
          value="Home"
          setTab={setActiveTabHandler}
        />
        <SaveSVG
          activeTab={activeTab}
          value="Save"
          setTab={setActiveTabHandler}
        />
        <CompassSVG
          activeTab={activeTab}
          value="Compass"
          setTab={setActiveTabHandler}
        />
      </section>
    );
  }
};
