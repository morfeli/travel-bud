import { useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { SearchSVG } from "../Icons/SearchSVG";
import { Venues } from "./Venues";

export interface Data {
  fsq_id: string;
  name: string;
  location: {
    address: string;
    locality: string;
  };
}
[];

export const SearchBar = () => {
  const travelCtx = useTravelContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const lat = travelCtx.userCoordinates.lat;
  const lon = travelCtx.userCoordinates.lng;

  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3xR8XOiv7Lq6kjje+r8k78gDySBpeuTW6Rr3BHtZ0j2M=",
      },
    };

    if (userSearch.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    }

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${userSearch}&ll=${lat}%2C${lon}`,
      options
    )
      .then((res) => res.json())

      .then((data) => {
        setLoading(true);
        setData(data.results);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="relative flex flex-col pt-4">
      <div className="flex">
        <label htmlFor="search" />
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for a nearby venue"
          className="py-2 pl-2 border-2 outline-none w-60 border-darkPurpleFour rounded-tl-md rounded-bl-md"
          onChange={(e) => setUserSearch(e.target.value)}
        />
        {/* <SearchSVG /> */}
        <button
          type="submit"
          onClick={fetchData}
          className="w-20 text-white bg-darkPurpleFour rounded-tr-md rounded-br-md"
        >
          Submit
        </button>
      </div>
      <Venues error={error} loading={loading} data={data} />
    </div>
  );
};
