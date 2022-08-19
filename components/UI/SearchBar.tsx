import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { SearchSVG } from "../Icons/SearchSVG";

export const SearchBar = () => {
  const travelCtx = useTravelContext();
  const [destination, setDestination] = useState<string>("");

  const destinationSelectHandler = async (value: string) => {
    console.log(value.trim());
    setDestination(value);
    const result = await geocodeByAddress(value);
    const cord = await getLatLng(result[0]);
    travelCtx.toggleCoordinates(cord);
  };

  const fetchWikiData = () => {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${destination}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const searchOptions = {
    types: ["(cities)"],
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
            <button
              className="p-2 ml-4 rounded-xl bg-medpurpleThree"
              onClick={fetchWikiData}
            >
              Search
            </button>

            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, idx) => {
                console.log(suggestion);
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
