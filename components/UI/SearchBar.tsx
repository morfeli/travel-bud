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
          onChange={(e) => travelCtx.toggleUserSearch(e.target.value)}
        />
        <button
          type="submit"
          onClick={travelCtx.fetchData}
          className="w-20 text-white bg-darkPurpleFour rounded-tr-md rounded-br-md"
        >
          Submit
        </button>
      </div>
      <Venues
        error={travelCtx.error}
        loading={travelCtx.loading}
        data={travelCtx.data}
      />
    </div>
  );
};
