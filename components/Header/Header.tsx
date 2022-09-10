import { motion } from "framer-motion";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { useState } from "react";
import { SunSVG } from "../Icons/SunSVG";
import { MoonSVG } from "../Icons/MoonSVG";
import { LogOutBtn } from "../UI/LogOutBtn";

export const Header = () => {
  const travelCtx = useTravelContext();
  const [toggleSwitch, setToggleSwitch] = useState<boolean>(false);

  const toggleSwitchHandler = () => {
    setToggleSwitch((current) => !current);
    travelCtx.toggleDarkMode();
  };

  const toggleSwitchVariants = {
    initial: { x: 0 },
    animate: { x: 30 },
  };

  return (
    <header className="flex justify-between p-2 bg-darkpurpleTwo">
      <h1 className="text-white">FourSquare Venue Locator</h1>
      <div className="flex items-center justify-between w-44">
        {!travelCtx.darkMode ? <SunSVG /> : <MoonSVG />}

        <button
          onClick={toggleSwitchHandler}
          className="flex items-center justify-start p-1 bg-slate-300 w-14 rounded-2xl"
        >
          <motion.div
            variants={toggleSwitchVariants}
            initial={"initial"}
            animate={toggleSwitch ? "animate" : "initial"}
            className="w-4 h-4 rounded-full bg-lightpurpleThree"
          ></motion.div>
        </button>
        <LogOutBtn />
      </div>
    </header>
  );
};
