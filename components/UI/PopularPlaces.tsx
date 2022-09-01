import { useTravelContext } from "../helper-functions/useTravelContext";
import { useState } from "react";

export const PopularPlaces = () => {
  const travelCtx = useTravelContext();

  return (
    <section className="flex flex-col py-8">
      <h1 className="self-center text-xl">Popular Places Nearby</h1>
      {travelCtx.nearByData.length === 0 && <p>Loading...</p>}
      <div className="grid grid-cols-3 py-6">
        {travelCtx.nearByData.map((item) => {
          return (
            <div
              key={item.fsq_id}
              className="flex items-center justify-center p-2 m-2 text-center rounded-md bg-lightpurpleThree"
            >
              <p className="text-md">{item.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
