import classNames from "classnames";
import { motion } from "framer-motion";

import { useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { SunSVG } from "../Icons/SunSVG";
import { MoonSVG } from "../Icons/MoonSVG";

export const DashboardHero = () => {
  const [toggleSwitch, setToggleSwitch] = useState<boolean>(false);
  const travelCtx = useTravelContext();

  const toggleSwitchHandler = () => {
    setToggleSwitch((current) => !current);
    travelCtx.toggleDarkMode();
  };

  const toggleSwitchVariants = {
    initial: { x: 0 },
    animate: { x: 30 },
  };

  let style;

  style = classNames("flex justify-between pt-4 px-2");

  if (travelCtx.darkMode) {
    style = classNames("bg-darkMode flex justify-between pt-4 px-2");
  }
  return (
    <section className={style}>
      <div className="flex pt-2 pl-2">
        <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
        <div
          className={classNames("pl-2", {
            "text-white": travelCtx.darkMode,
          })}
        >
          <h1 className="text-sm">
            {travelCtx.firstName} {travelCtx.lastName}
          </h1>
          <p className="text-sm">{travelCtx.userName}</p>
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
    </section>
  );
};
