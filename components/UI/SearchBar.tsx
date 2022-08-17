import { SearchSVG } from "../Icons/SearchSVG";

export const SearchBar = () => {
  return (
    <div className="relative flex items-center pt-4">
      <label htmlFor="searchDestinations" />
      <input
        type="text"
        id="searchDestinations"
        name="searchDestinations"
        placeholder="The world awaits..."
        className="p-2 pl-8 border-2 outline-none border-medpurpleThree"
      />
      <SearchSVG />
      <button className="p-2 ml-4 rounded-md bg-medpurpleThree">Search</button>
    </div>
  );
};
