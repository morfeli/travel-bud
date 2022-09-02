import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

type PrivateSliderProps = {
  placePhotos: any[];
};

export const PrivateSlider = ({ placePhotos }: PrivateSliderProps) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setTimeout(
      () =>
        setIndex((current) =>
          current === placePhotos.length - 1 ? 0 : current + 1
        ),
      6000
    );

    return () => clearInterval(interval);
  }, [index, placePhotos]);

  return (
    <div className="pt-8">
      <div className="max-w-md m-auto overflow-hidden">
        <motion.div
          animate={{ translateX: `${-index * 100}%` }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="whitespace-nowrap"
        >
          {placePhotos.map((image: any, i: number) => {
            const prefix = image.prefix;
            const suffix = image.suffix;
            const source = `${prefix}original${suffix}`;
            return (
              <Image
                key={i}
                src={source}
                width={500}
                height={500}
                className="inline-block mx-2 my-2 rounded-3xl"
                priority
              />
            );
          })}
        </motion.div>
      </div>
      <div className="flex items-center justify-center py-4">
        {placePhotos.map((dot: any, idx: number) => (
          <div
            onClick={() => {
              setIndex(idx);
            }}
            key={idx}
            className={classNames(
              "mx-2",
              "w-4",
              "h-4",
              "bg-lightpurpleOne",
              "rounded-lg",
              "cursor-pointer",
              "inline-block",
              { "bg-darkpurpleOne": index === idx }
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};
