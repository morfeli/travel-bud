import { useTravelContext } from "../helper-functions/useTravelContext";
import classNames from "classnames";

export const PopularPlaces = () => {
  const travelCtx = useTravelContext();

  const textStyle = classNames("text-sm text-center p-4", {
    "text-white": travelCtx.darkMode,
    "text-black": !travelCtx.darkMode,
  });

  return (
    <section className="flex flex-col py-8">
      <h1 className={textStyle}>Popular Places Nearby</h1>
      {travelCtx.nearByData.length === 0 && (
        <p className="text-center">Loading...</p>
      )}
      <div className="grid grid-cols-3 py-6">
        {travelCtx.nearByData.map((item) => {
          return (
            <div
              key={item.fsq_id}
              className="flex items-center justify-center m-2 text-center rounded-md bg-lightpurpleThree"
            >
              <p className={textStyle}>{item.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
