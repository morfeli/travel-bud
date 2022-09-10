import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { SortButton } from "../UI/SortButton";
import { Map } from "../UI/Map";

type SavedProfilePageProps = {
  length: number;
  data: any[];
  username: string;
  objectID: string;
};

const ratingValues = [
  { id: 0, rate: "0" },
  { id: 1, rate: "1" },
  { id: 2, rate: "2" },
  { id: 3, rate: "3" },
  { id: 4, rate: "4" },
  { id: 5, rate: "5" },
];

type formInput = {
  post: string;

  touched: {
    post: boolean;
  };
  valid: {
    post: boolean;
  };
};

const initialFormState = {
  post: "",

  touched: {
    post: false,
  },
  valid: {
    post: false,
  },
};

const isValid = (value: string) => value.trim().length >= 5;

export const SavedProfilePage = ({
  length,
  data,
  username,
  objectID,
}: SavedProfilePageProps) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [venueDetails, setVenueDetails] = useState<{
    name: string;
    address: string;
    localilty: string;
  }>({ name: "", address: "", localilty: "" });
  const [formInput, setFormInput] = useState<formInput>(initialFormState);
  const [rateValue, setRateValue] = useState<string>("");
  const [venueCords, setVenueCords] = useState<[{ lat: number; lng: number }]>([
    { lat: 0, lng: 0 },
  ]);

  const router = useRouter();

  const displayFormandPassDataHandler = (
    name: string,
    address: string,
    localilty: string
  ) => {
    setVenueDetails({
      name: name,
      address: address,
      localilty: localilty,
    });
    setDisplayForm(true);
  };

  const captureRateHandler = (value: string) => {
    setRateValue(value);
  };

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = formInput.post;
    const postIsValid = isValid(post);

    setFormInput((current) => ({
      ...current,
      valid: {
        post: postIsValid,
      },
    }));

    let rateIsValid;
    if (rateValue.trim() === "") {
      rateIsValid = false;
    } else {
      rateIsValid = true;
    }

    if (postIsValid && rateIsValid) {
      const name = venueDetails.name;
      const address = venueDetails.address;
      const localilty = venueDetails.localilty;

      const userData = {
        post,
        rateValue,
        username,
        objectID,
        name,
        address,
        localilty,
      };

      fetch("/api/savePost", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      setTimeout(() => {
        router.reload();
      }, 3);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      let venueCords: any = [];

      data[0].savedVenues.map((item: any) => {
        const venueMarkers = {
          lat: item.venueLat,
          lng: item.venueLon,
        };

        venueCords.push(venueMarkers);
      });

      setVenueCords(venueCords);
    }
  }, []);

  if (displayForm) {
    return (
      <section className="flex flex-col items-baseline bg-slate-300 lg:rounded-md">
        <button
          onClick={() => setDisplayForm(false)}
          className="px-4 py-2 mt-4 ml-4 rounded-md bg-medpurpleOne"
        >
          Go Back
        </button>
        <form
          className="flex flex-col justify-around h-screen py-8"
          onSubmit={submitFormHandler}
        >
          <h1 className="self-center w-3/4 pb-8 text-2xl text-center border-b-2 border-lightpurpleThree">
            How was your time at... <br />
            <span>{venueDetails.name}</span>?
          </h1>
          <div className="flex flex-col">
            <p className="self-center px-2 py-4 text-center text-md">
              Leave a review regarding your experience at <br />
              {venueDetails.name}.
            </p>
            <textarea
              onChange={(e) =>
                setFormInput((current) => ({
                  ...current,
                  post: e.target.value,
                  touched: {
                    ...current.touched,
                    post: true,
                  },
                }))
              }
              rows={2}
              cols={25}
              id="userPost"
              name="userPost"
              placeholder="How'd it go?"
              className="self-center p-4 mt-4 border-2 rounded-lg shadow-xl shadow-lightpurpleTwo border-darkpurpleThree"
            />
          </div>
          <div className="flex flex-col items-center">
            <SortButton
              ratingValues={ratingValues}
              captureRate={captureRateHandler}
            />
          </div>

          <button
            type="submit"
            className="self-center p-2 mt-10 tracking-widest text-white uppercase rounded-md shadow-xl shadow-lightpurpleTwo bg-darkpurpleThree"
          >
            Submit
          </button>
        </form>
      </section>
    );
  }

  if (data.length > 0) {
    let word;
    if (data[0].savedVenues.length > 1) {
      word = "Venues";
    } else {
      word = "Venue";
    }

    return (
      <section className="py-10">
        <div className="flex items-center justify-between w-48 mx-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medpurpleOne">
            {length}
          </div>
          <h1 className="text-xl text-center">Saved {word}</h1>
        </div>

        <div className="grid sm:grid-cols-4">
          {data[0].savedVenues.map((item: any, i: number) => {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={i}
                className="p-4 m-4 rounded-md cursor-pointer bg-lightpurpleThree"
                onClick={() =>
                  displayFormandPassDataHandler(
                    item.name,
                    item.address,
                    item.localilty
                  )
                }
              >
                <h1>{item.name}</h1>
                <p>
                  {item.address}, {item.locality}
                </p>
              </motion.div>
            );
          })}
        </div>

        <Map markerCords={venueCords} />
      </section>
    );
  } else {
    return <section>Go save some places to check out...</section>;
  }
};
