import { Data as iData } from "./SearchBar";
import { motion } from "framer-motion";
import { HeartSVG } from "../Icons/HeartSVG";
import { useEffect, useState } from "react";

type DestinationCardProps = {
  error: boolean;
  loading: boolean;
  data: iData[];
};

export const Venues = ({ error, loading, data }: DestinationCardProps) => {
  const [test, setTest] = useState<boolean>(false);
  const [placeTips, setPlaceTips] = useState([]);
  const [placePhotos, setPlacePhotos] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3xR8XOiv7Lq6kjje+r8k78gDySBpeuTW6Rr3BHtZ0j2M=",
    },
  };

  const fetchPlaceDetailsAndPhotos = (value: string) => {
    setTest(true);
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

  useEffect(() => {
    console.log(placePhotos);
  }, [placePhotos, placeTips]);

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
        <div className="grid grid-cols-5">
          {placeTips.map((item: any) => {
            return (
              <div
                className="flex p-4 m-4 bg-red-200 rounded-2xl"
                key={item.id}
              >
                {item.text ? (
                  <h1>{item.text}</h1>
                ) : (
                  <h1>No text available, go check it out yourself :D</h1>
                )}
              </div>
            );
          })}
          {placePhotos.map((photo: any, i: number) => {
            const prefix = photo.prefix;
            const suffix = photo.suffix;
            const source = `${prefix}${suffix}`;
            console.log(source);
            return <p key={i}>hello</p>;
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:mx-auto sm:justify-items-center sm:px-6 md:grid-cols-4 lg:grid-cols-6">
      {data.map((item, i) => {
        return (
          <motion.div
            initial={{
              opacity: 0,
              translateX: i % 2 === 0 ? -50 : 50,
              translateY: -50,
            }}
            onClick={() => fetchPlaceDetailsAndPhotos(item.fsq_id)}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            key={item.fsq_id}
            className="relative flex flex-col items-center self-center p-1 m-2 text-center rounded-md cursor-pointer justify-evenly w-80 bg-lightpurpleOne sm:w-52 md:w-40 md:justify-center"
          >
            <button className="absolute p-1 bg-white rounded-md right-2 top-1">
              <HeartSVG />
            </button>
            <div className="pt-2">
              <h2 className="px-2 text-xl md:pt-4">{item.name}</h2>
              <p className="text-md">
                {item.location.address}, {item.location.locality}
              </p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};
