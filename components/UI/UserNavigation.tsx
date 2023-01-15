import { useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { CompassSVG } from "../Icons/CompassSVG";
import { HomeSVG } from "../Icons/HomeSVG";
import { SaveSVG } from "../Icons/SaveSVG";

type UserNavigationProps = {
  isMobile: boolean;
  innerWidth: number;
};

export interface ActiveTab {
  value: string;
  setTab: (value: string) => void;
}

export const UserNavigation = ({ isMobile }: UserNavigationProps) => {
  const travelCtx = useTravelContext();

  const setActiveTabHandler = (value: string) => {
    travelCtx.toggleTab(value);
  };

  if (isMobile) {
    return (
      <section className="fixed bottom-0 z-50 flex justify-around w-screen p-4 mt-4 rounded-t-2xl bg-darkpurpleTwo">
        <HomeSVG value="Home" setTab={setActiveTabHandler} />
        <SaveSVG value="Save" setTab={setActiveTabHandler} />
        <CompassSVG value="Compass" setTab={setActiveTabHandler} />
      </section>
    );
  } else {
    return (
      <section className="flex flex-col justify-around w-16 h-screen p-4 m-1 rounded-full bg-darkPurpleFour">
        <HomeSVG value="Home" setTab={setActiveTabHandler} />
        <SaveSVG value="Save" setTab={setActiveTabHandler} />
        <CompassSVG value="Compass" setTab={setActiveTabHandler} />
      </section>
    );
  }
};
