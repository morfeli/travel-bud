import { useState, useEffect } from "react";

import { CompassSVG } from "../Icons/CompassSVG";
import { HomeSVG } from "../Icons/HomeSVG";
import { SaveSVG } from "../Icons/SaveSVG";

export interface ActiveTab {
  activeTab: string;
  value: string;
  setTab: (value: string) => void;
}

export const UserNavigation = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const setActiveTabHandler = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="absolute left-0 flex justify-around pt-4 bottom-4 w-375px">
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
};
