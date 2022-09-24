import { Data as iData } from "./SearchBar";
import { motion } from "framer-motion";

import { useState } from "react";
import { PrivateSlider } from "./PrivateSlider";
import { SaveButton } from "./SaveButton";

type DestinationCardProps = {
  error: boolean;
  loading: boolean;
  data: iData[];
  userStateData: any[];
  savedData: any[];
  email: string;
  objectID: string;
  storeStateData: (item: any) => void;
};

export const Venues = ({
  error,
  loading,
  data,
  email,
  objectID,
  savedData,
  storeStateData,
  userStateData,
}: DestinationCardProps) => {
  const [test, setTest] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [placeTips, setPlaceTips] = useState([]);
  const [placePhotos, setPlacePhotos] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [hello, setHello] = useState<boolean>(false);

  const savedVenueDataFSQID = savedData[0].savedVenues.map(
    (item: any) => item.fsq_id
  );

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3xR8XOiv7Lq6kjje+r8k78gDySBpeuTW6Rr3BHtZ0j2M=",
    },
  };

  const fetchPlaceDetailsAndPhotos = (
    value: string,
    title: string,
    e: React.SyntheticEvent
  ) => {
    let target = e.target as HTMLElement;
    if (target.nodeName === "svg") {
      return;
    }
    setTest(true);
    setSelectedTitle(title);
    setLoadingDetails(true);

    fetch(`https://api.foursquare.com/v3/places/${value}/tips`, options)
      .then((response) => response.json())
      .then((response) => setPlaceTips(response))
      .catch((err) => console.error(err));

    fetch(`https://api.foursquare.com/v3/places/${value}/photos`, options)
      .then((response) => response.json())
      .then((response) => setPlacePhotos(response))
      .catch((err) => console.error(err));

    setLoadingDetails(false);
  };

  if (error) {
    return (
      <p className="py-4 text-center">
        There has been an error, please try again!
      </p>
    );
  }

  if (loading) {
    return <p className="py-4 text-center">Loading...</p>;
  }

  if (test) {
    return (
      <section>
        <button
          onClick={() => setTest(false)}
          className="p-2 ml-8 text-white rounded-lg w-fit bg-darkPurpleFour"
        >
          Go Back
        </button>
        {loadingDetails && <p>Loading venue details...</p>}
        {placeTips.length == 0 && (
          <div className="flex items-center justify-center p-4 m-4 mx-auto text-center text-white rounded-lg bg-medpurpleOne w-fit">
            <h1>No text available, go check it out yourself :D </h1>
          </div>
        )}
        <div className="flex flex-col pt-8">
          <p className="text-lg text-center">
            User reviews for... <br />
            <span className="text-3xl text-center border-b-2 border-medpurpleThree">
              {selectedTitle}
            </span>
          </p>
          <ul className="py-4">
            {placeTips.map((item: any) => {
              return (
                <li
                  className="flex p-4 m-4 list-none bg-lightpurpleOne rounded-2xl"
                  key={item.id}
                >
                  {item.text ? (
                    <h1 className="text-sm">{item.text}</h1>
                  ) : (
                    <h1>No text available, go check it out yourself :D</h1>
                  )}
                </li>
              );
            })}
          </ul>
          <PrivateSlider placePhotos={placePhotos} />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col py-4 sm:grid sm:grid-cols-3 sm:mx-auto sm:justify-items-center md:grid-cols-4 md:gap-6 xl:grid-cols-6">
      {data.map((item, i) => {
        const stateData = {
          id: item.fsq_id,
          name: item.name,
          address: item.location.address,
          locality: item.location.locality,
          venueLat: item.geocodes.main.latitude,
          venueLon: item.geocodes.main.longitude,
        };

        return (
          <motion.div
            initial={{
              opacity: 0,
              translateX: i % 2 === 0 ? -50 : 50,
              translateY: -50,
            }}
            onClick={(e) => {
              fetchPlaceDetailsAndPhotos(item.fsq_id, item.name, e);
              storeStateData(stateData);
            }}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            key={item.fsq_id}
            className="relative flex flex-col self-center p-1 m-2 text-center rounded-md cursor-pointer justify-evenly w-80 hover:my-rotate-y-180 bg-lightpurpleOne sm:w-40 sm:h-40 md:justify-center"
          >
            <SaveButton
              userSavedIDS={savedVenueDataFSQID}
              userStateData={userStateData}
              itemID={item.fsq_id}
              name={item.name}
              address={item.location.address}
              locality={item.location.locality}
              venueLat={item.geocodes.main.latitude}
              venueLon={item.geocodes.main.longitude}
              email={email}
              objectID={objectID}
            />

            <div className="p-2">
              <p className="pt-4 mx-auto sm:text-sm md:pt-4">{item.name}</p>
              <p className="text-sm">
                {item.location.address}, {item.location.locality}
              </p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};
