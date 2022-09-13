import classNames from "classnames";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnerButton } from "./InnerButton";

type SortButtonProps = {
  ratingValues: { id: number; rate: string }[];
  captureRate: (value: string) => void;
};

export const SortButton = ({ ratingValues, captureRate }: SortButtonProps) => {
  const [active, setActive] = useState(false);
  const [sortValue, setSortValue] = useState<string>("");

  useEffect(() => {
    setSortValue(ratingValues[0].rate);
  }, [ratingValues]);

  const captureSortOption = (e: any) => {
    setSortValue(e.target.value);
    setActive(false);
    captureRate(e.target.value);
  };

  const toggleActive = () => {
    setActive((current) => !current);
  };

  const activeDivVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  let motionDivStyle;

  if (active) {
    motionDivStyle = classNames(
      "absolute z-40 top-20 flex w-72 justify-around px-8 bg-white rounded-lg shadow-lg shadow-lightpurpleTwo "
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={toggleActive}
        className="px-8 py-4 bg-white border-2 rounded-md shadow-xl border-darkpurpleThree shadow-lightpurpleTwo"
      >
        Rate your experience: {sortValue}
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={activeDivVariants}
            transition={{ type: "spring", stiffness: 100 }}
            className={motionDivStyle}
          >
            {ratingValues.map((item, i) => {
              return (
                <InnerButton
                  key={i}
                  rate={item.rate}
                  captureSortOption={captureSortOption}
                  sortValue={sortValue}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
