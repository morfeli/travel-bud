import { useTravelContext } from "../helper-functions/useTravelContext";
import moment from "moment";

type DestinationCardProps = {
  loading: boolean;
  data: {
    title: string;
    thumbnail: {
      source: string;
    };
    extract: string;
  };
};

export const DestinationCard = ({ data, loading }: DestinationCardProps) => {
  const travelCtx = useTravelContext();
  const sunriseTime = moment
    .unix(travelCtx.destinationWeatherData.sunrise)
    .format("LT");
  const sunsetTime = moment
    .unix(travelCtx.destinationWeatherData.sunset)
    .format("LT");

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data.title) {
    return (
      <div className="py-4 m-2 text-center bg-lightpurpleOne rounded-md my-4">
        <h1>Start searching for a destination...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-lightpurpleOne m-2 p-4 rounded-lg ">
        <h1 className="text-2xl">{data.title}</h1>
        <p className="text-sm">{data.extract}</p>
        <div>
          <h1>Current Weather</h1>
          <p>Temperature: {travelCtx.destinationWeatherData.mainTemp}F</p>
          <p className="capitalize">
            Description: {travelCtx.destinationWeatherData.weatherDesc}
          </p>
          <p>Sunrise: {sunriseTime}</p>
          <p>Sunset: {sunsetTime}</p>
        </div>
      </div>
    );
  }
};
