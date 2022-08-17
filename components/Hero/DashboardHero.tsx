import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import moment from "moment";

import { useTravelContext } from "../helper-functions/useTravelContext";
import { SunSVG } from "../Icons/SunSVG";
import { MoonSVG } from "../Icons/MoonSVG";
import { SearchBar } from "../UI/SearchBar";

type DashboardHeroProps = {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    objectId: string;
  };
};

export const DashboardHero = ({ userInfo }: DashboardHeroProps) => {
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

  let style;

  style = classNames("flex flex-col justify-between pt-4 px-2");

  if (travelCtx.darkMode) {
    style = classNames(
      "bg-darkMode text-white flex flex-col justify-between pt-4 px-2"
    );
  }
  return (
    <section className={style}>
      <div className="flex justify-between pt-2 pl-2">
        <div className="flex">
          <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
          <div className="pl-2">
            <h1 className="text-sm">
              {userInfo.firstName} {userInfo.lastName}
            </h1>
            <p className="text-sm">{userInfo.userName}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {!travelCtx.darkMode ? <SunSVG /> : <MoonSVG />}

          <button
            onClick={toggleSwitchHandler}
            className="flex items-center justify-start h-6 p-1 mt-2 bg-slate-300 w-14 rounded-2xl"
          >
            <motion.div
              variants={toggleSwitchVariants}
              initial={"initial"}
              animate={toggleSwitch ? "animate" : "initial"}
              className="w-4 h-4 rounded-full bg-lightpurpleThree"
            ></motion.div>
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p>
          {message}, {userInfo.firstName}.
        </p>
        <p>Where do you want to go?</p>
        <SearchBar />
      </div>
    </section>
  );
};
