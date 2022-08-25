import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useEffect, useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { SearchSVG } from "../Icons/SearchSVG";
import { DestinationCard } from "./DestinationCard";

export const SearchBar = () => {
  const travelCtx = useTravelContext();
  const [destination, setDestination] = useState<string>("");
  const [destinationData, setDestinationData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const destinationSelectHandler = async (value: string) => {
    setDestination(value);
    const result = await geocodeByAddress(value);
    const cord = await getLatLng(result[0]);
    travelCtx.toggleCoordinates(cord);
  };

  const fetchWikiData = () => {
    const test = destination.replace(/\s+/g, "_");
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${test}&gsrlimit=1&prop=pageimages|extracts&exchars=${300}&exintro&explaintext&exlimit=max&format=json&origin=*`;

    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const pageID = Object.keys(data.query.pages)[0];
        setDestinationData(data.query.pages[pageID]);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(destinationData);
  }, [destinationData]);

  const searchOptions = {
    types: ["(regions)"],
  };

  return (
    <div className="relative flex flex-col pt-4">
      <label htmlFor="searchDestinations" />
      <PlacesAutocomplete
        value={destination}
        onChange={setDestination}
        onSelect={destinationSelectHandler}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <SearchSVG />
            <input
              {...getInputProps({
                placeholder: "Search Places ...",

                className: "border-2 border-medpurpleOne py-2 pl-8 rounded-xl",
              })}
            />
            <button
              className="p-2 ml-4 rounded-xl bg-medpurpleThree"
              onClick={fetchWikiData}
            >
              Search
            </button>

            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, idx) => {
                const style = {
                  backgroundColor: suggestion.active ? "#d2b7e5" : "#fff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                    key={suggestion.placeId}
                    className="cursor-pointer"
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <DestinationCard data={destinationData} loading={loading} />
    </div>
  );
};
