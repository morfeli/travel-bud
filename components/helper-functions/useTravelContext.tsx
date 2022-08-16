import { useContext } from "react";
import { TravelContext } from "../store/travel-context";

export const useTravelContext = () => {
  const travelCtx = useContext(TravelContext);

  return travelCtx;
};
