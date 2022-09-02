import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import moment from "moment";

import { useTravelContext } from "../helper-functions/useTravelContext";
import { SunSVG } from "../Icons/SunSVG";
import { MoonSVG } from "../Icons/MoonSVG";
import { PinSVG } from "../UI/PinSVG";
import { SearchBar } from "../UI/SearchBar";

type DashboardHeroProps = {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    objectId: string;
  };
  isMobile: boolean;
  innerWidth: number;
};

export const DashboardHero = ({
  userInfo,
  isMobile,
  innerWidth,
}: DashboardHeroProps) => {
  const travelCtx = useTravelContext();
  const [toggleSwitch, setToggleSwitch] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const date = new Date();
  const currentTime = parseInt(moment(date).format("HH"));

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setMessage("Good Morning");
    }
    if (currentTime >= 12 && currentTime < 19) {
      setMessage("Good Afternoon");
    }
    if (currentTime >= 19 && currentTime < 21) {
      setMessage("Good Evening");
    }
    if (currentTime >= 21 || currentTime < 5) {
      setMessage("Good Night");
    }
  }, [currentTime]);

  const toggleSwitchHandler = () => {
    setToggleSwitch((current) => !current);
    travelCtx.toggleDarkMode();
  };

  const toggleSwitchVariants = {
    initial: { x: 0 },
    animate: { x: 30 },
  };

  if (isMobile) {
    return (
      <motion.section
        className="flex flex-col justify-between px-2 py-8 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="sm:flex sm:justify-between">
          <div className="flex justify-between pt-2 text-md">
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
              <div className="pl-2">
                <h1>
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p>{userInfo.userName}</p>
              </div>
            </div>
          </div>

          {travelCtx.userLocation && (
            <div className="flex py-4 text-lg">
              <PinSVG />
              <span>
                {travelCtx.userLocation.locality}, {travelCtx.userLocation.city}
                , {travelCtx.userLocation.principalSubdivision}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 sm:flex sm:justify-between">
          <div className="">
            <p>
              {message}, {userInfo.firstName}.
            </p>
            <p className="text-2xl">Where do you want to go?</p>
          </div>

          <SearchBar />
        </div>
      </motion.section>
    );
  } else {
    return (
      <motion.section
        className="flex flex-col px-2 py-8 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-between">
          <div className="flex justify-between pt-2">
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
              <div className="pl-2">
                <h1 className="text-lg">
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p className="text-sm">{userInfo.userName}</p>
              </div>
            </div>
          </div>

          {travelCtx.userLocation && (
            <div className="flex py-4">
              <PinSVG />
              <span>
                {travelCtx.userLocation.locality}, {travelCtx.userLocation.city}
                , {travelCtx.userLocation.principalSubdivision}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 sm:flex sm:justify-between">
          <div className="">
            <p>
              {message}, {userInfo.firstName}.
            </p>
            <p className="text-2xl">Where do you want to go?</p>
          </div>

          <SearchBar />
        </div>
      </motion.section>
    );
  }
};
