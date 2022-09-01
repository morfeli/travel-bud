import { BarSVG } from "../Icons/BarSVG";
import { BeachSVG } from "../Icons/BeachSVG";
import { CoffeeSVG } from "../Icons/CoffeeSVG";
import { GymSVG } from "../Icons/GymSVG";
import { HotelSVG } from "../Icons/HotelSVG";
import { JuiceSVG } from "../Icons/JuiceSVG";
import { MovieSVG } from "../Icons/MovieSVG";
import { ParkSVG } from "../Icons/ParkSVG";
import { SpaSVG } from "../Icons/SpaSVG";

export interface CategoryType {
  value: string;
}

export const Categories = () => {
  return (
    <div className="grid grid-cols-3 gap-12 px-4 justify-items-center sm:grid-cols-4">
      <BeachSVG value="beach" />
      <SpaSVG value="spa" />
      <MovieSVG value="movie" />
      <HotelSVG value="hotel" />
      <CoffeeSVG value="coffee" />
      <JuiceSVG value="juice" />
      <ParkSVG value="park" />
      <BarSVG value="bar" />
      <GymSVG value="gym" />
    </div>
  );
};
