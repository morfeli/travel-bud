import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { motion } from "framer-motion";
import classNames from "classnames";

import { SortButton } from "../UI/SortButton";
import { Map } from "../UI/Map";
import { Modal } from "../UI/Modal";

type SavedProfilePageProps = {
  length: number;
  data: any[];
  username: string;
  objectID: string;
  stateData: any[];
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
  stateData,
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
  const [APIMessage, setAPIMessage] = useState<string | boolean>(false);
  const [renderModal, setRenderModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    APIMessage && setRenderModal((current) => !current);
  }, [APIMessage]);

  useEffect(() => {
    renderModal &&
      setTimeout(() => {
        router.reload();
      }, 6000);
  }, [renderModal]);

  const travelCtx = useTravelContext();

  const divStyle = classNames("p-4 m-4 rounded-md cursor-pointer", {
    "bg-lightpurpleThree": !travelCtx.darkMode,
    "bg-white": travelCtx.darkMode,
    "cursor-auto": displayForm,
  });

  const buttonStyle = classNames(
    "self-start px-4 py-2 mt-4 ml-4 rounded-md border-2 border-darkpurpleThree",
    {
      "bg-white": !travelCtx.darkMode,
      "bg-darkpurpleTwo": travelCtx.darkMode,
      "text-white": travelCtx.darkMode,
    }
  );

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
        .then((data) => setAPIMessage(data.message))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    let venueCords: any = [];
    if (data.length > 0) {
      data[0].savedVenues.map((item: any) => {
        const venueMarkers = {
          lat: item.venueLat,
          lng: item.venueLon,
          name: item.name,
        };

        venueCords.push(venueMarkers);
      });
    }
    if (stateData.length > 0) {
      stateData.map((item: any) => {
        const venueMarkers = {
          lat: item.venueLat,
          lng: item.venueLon,
          name: item.name,
        };
        venueCords.push(venueMarkers);
      });
    }

    setVenueCords(venueCords);
  }, [stateData, data]);

  if (displayForm) {
    return (
      <section className={divStyle}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDisplayForm(false)}
          className={buttonStyle}
        >
          Go Back
        </motion.button>
        <form
          className="flex flex-col h-screen py-8 justify-evenly md:h-full md:w-75vw"
          onSubmit={submitFormHandler}
        >
          <h1 className="self-center pb-8 text-2xl text-center border-b-2 border-lightpurpleThree">
            How was your time at...
            <br />
            <p className="px-8 pt-4 text-md">{venueDetails.name}?</p>
          </h1>

          <div className="flex flex-col">
            <p className="self-center px-2 py-4 text-center text-md">
              Post a review regarding your experience at <br />
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
              className="self-center p-4 mt-4 border-2 rounded-lg shadow-xl outline-none cursor-pointer shadow-lightpurpleTwo border-darkpurpleThree"
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
            className={classNames(
              "self-center p-2 mt-10 tracking-widest uppercase rounded-md shadow-xl shadow-lightpurpleTwo border-2 border-darkpurpleThree",
              {
                "bg-white": !travelCtx.darkMode,
                "text-black": !travelCtx.darkMode,
                "bg-darkpurpleThree": travelCtx.darkMode,
                "text-white": travelCtx.darkMode,
              }
            )}
          >
            Submit
          </button>

          <Modal
            active={renderModal}
            status={APIMessage}
            color="bg-lightpurpleOne"
          />
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

    let UILength;

    if (!stateData) {
      UILength = length;
    } else {
      UILength = stateData.length + length;
    }

    return (
      <section className="p-4 md:h-screen md:overflow-y-scroll md:scroll-smooth">
        <div className="flex items-center justify-around w-48 mx-auto">
          <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-darkpurpleOne">
            {UILength}
          </div>
          <h1
            className={classNames("text-xl, text-center", {
              "text-white": travelCtx.darkMode,
            })}
          >
            Saved {word}
          </h1>
        </div>

        <div className="grid py-4 sm:grid-cols-4">
          {data[0].savedVenues.map((item: any, i: number) => {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={i}
                className={divStyle}
                onClick={() =>
                  displayFormandPassDataHandler(
                    item.name,
                    item.address,
                    item.localilty
                  )
                }
              >
                <h1 className="text-center">{item.name}</h1>
                <p className="text-center">
                  {item.address}, {item.locality}
                </p>
              </motion.div>
            );
          })}
          {stateData &&
            stateData.map((item: any, i: number) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={item.id}
                  className={divStyle}
                  onClick={() =>
                    displayFormandPassDataHandler(
                      item.name,
                      item.address,
                      item.localilty
                    )
                  }
                >
                  <h1 className="text-center">{item.name}</h1>
                  <p className="text-center">
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
    return (
      <section className="flex flex-col items-center justify-center h-screen px-8">
        <p className="text-center">
          Visit the Explore tab to save venues. Come back to the Explore tab
          once you have created a saved list.
        </p>
      </section>
    );
  }
};
