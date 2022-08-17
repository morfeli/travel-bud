import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import { SearchSVG } from "../Icons/SearchSVG";

export const SearchBar = () => {
  const [destination, setDestination] = useState<string>("");

  const destinationSelectHandler = (value: string) => {
    geocodeByAddress(value);
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
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "border-2 border-medpurpleOne py-2 ",
              })}
            />
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

      <SearchSVG />
      <button className="p-2 ml-4 rounded-md bg-medpurpleThree">Search</button>
    </div>
  );
};
