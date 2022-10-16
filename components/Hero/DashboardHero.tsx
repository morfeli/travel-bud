import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTravelContext } from "../helper-functions/useTravelContext";

import moment from "moment";
import classNames from "classnames";

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
};

export const DashboardHero = ({ userInfo, isMobile }: DashboardHeroProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const travelCtx = useTravelContext();
  const city = travelCtx.userLocation.city;
  const city2 = travelCtx.userLocation.locality;
  const city3 = travelCtx.userLocation.principalSubdivision;

  useEffect(() => {
    if (city || city2 || city3) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [city, city2, city3]);

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

  const textStyle = classNames({
    "text-white": travelCtx.darkMode,
    "text-black": !travelCtx.darkMode,
  });

  if (isMobile) {
    return (
      <motion.section className="flex flex-col justify-between px-2 py-8 sm:px-4">
        <div className="sm:flex sm:justify-between">
          <div className="flex justify-between pt-2 text-md">
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
              <div className="pl-2">
                <h1 className={textStyle}>
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p className={textStyle}>{userInfo.userName}</p>
              </div>
            </div>
          </div>

          {!loading ? (
            <div className="flex py-4 text-lg">
              <PinSVG />
              <span className={textStyle}>
                {travelCtx.userLocation.city},{travelCtx.userLocation.locality},
                , {travelCtx.userLocation.principalSubdivision}
              </span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="pt-4 sm:flex sm:justify-between">
          <div>
            <p className={textStyle}>
              {message}, {userInfo.firstName}.
            </p>
            <p className={classNames(textStyle, "text-2xl")}>
              Where do you want to go?
            </p>
          </div>

          <SearchBar />
        </div>
      </motion.section>
    );
  } else {
    return (
      <motion.section className="flex flex-col px-2 py-8 sm:px-4">
        <div className="flex justify-between">
          <div className="flex justify-between pt-2">
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-lightpurpleOne" />
              <div className="pl-2">
                <h1 className={classNames(textStyle, "text-2xl")}>
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p className={classNames(textStyle, "text-lg")}>
                  {userInfo.userName}
                </p>
              </div>
            </div>
          </div>

          {!loading ? (
            <div className="flex py-4 text-lg">
              <PinSVG />
              <span className={textStyle}>
                {travelCtx.userLocation.city}, {travelCtx.userLocation.locality}
                , {travelCtx.userLocation.principalSubdivision}
              </span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="pt-4 sm:flex sm:justify-between">
          <div className="">
            <p className={textStyle}>
              {message}, {userInfo.firstName}.
            </p>
            <p className={classNames(textStyle, "text-2xl")}>
              Where do you want to go?
            </p>
          </div>

          <SearchBar />
        </div>
      </motion.section>
    );
  }
};
