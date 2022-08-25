import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useEffect, useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { SearchSVG } from "../Icons/SearchSVG";

type DestinationType = {
  query: {};
};

export const SearchBar = () => {
  const travelCtx = useTravelContext();
  const [destination, setDestination] = useState<string>("");
  const [destinationData, setDestinationData] = useState({});

  const destinationSelectHandler = async (value: string) => {
    setDestination(value);
    const result = await geocodeByAddress(value);
    const cord = await getLatLng(result[0]);
    travelCtx.toggleCoordinates(cord);
  };

  const searchOptions = {
    types: ["(regions)"],
  };

  return (
    <div className="relative flex items-center pt-4">
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
            <button className="p-2 ml-4 rounded-xl bg-medpurpleThree">
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
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};
