import { useState } from "react";

type SaveButtonProps = {
  itemID: string;
  name: string;
  address: string;
  locality: string;
  email: string;
  objectID: string;
  venueLat: string | number;
  venueLon: string | number;
  userSavedIDS: string[];
  userStateData: any[];
  storeStateData: (item: any) => void;
};

export const SaveButton = ({
  itemID,
  name,
  address,
  locality,
  email,
  objectID,
  venueLat,
  venueLon,
  userSavedIDS,
  userStateData,
  storeStateData,
}: SaveButtonProps) => {
  const [userSaved, setUserSaved] = useState<boolean>(false);

  const userStateVenueIDS = userStateData.map((item) => item.id);

  const stateData = {
    id: itemID,
    name,
    address,
    locality,
    venueLat,
    venueLon,
  };

  const toggleSaveStyle = () => {
    setUserSaved(true);
  };

  const onClick = () => {
    toggleSaveStyle();
    storeStateData(stateData);

    const data = {
      fsq_id: itemID,
      name: name,
      address: address,
      locality: locality,
      email: email,
      objectID: objectID,
      venueLat: venueLat,
      venueLon: venueLon,
    };

    setTimeout(() => {
      fetch("/api/saveLocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }, 3);
  };

  let style = false;

  if (userSavedIDS) {
    if (userSavedIDS.includes(itemID)) {
      style = true;
    }
  }

  if (userStateVenueIDS) {
    if (userStateVenueIDS.includes(itemID)) {
      style = true;
    }
  }

  return (
    <svg
      className="w-4 h-4"
      name="saveButton"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill={userSaved || style ? "red" : "black"}
    >
      <path d="M244 84l11.1 12 12-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.9-.9 0 0 .01 0 0zm11.1 79.9l-45-46.8c-21.7-20.82-52.5-30.7-82.8-25.66C81.55 99.07 48 138.7 48 185.1v5.8c0 28.2 11.71 55.2 32.34 74.4L256 429.3l175.7-164c20.6-19.2 32.3-46.2 32.3-74.4v-5.8c0-46.4-33.6-86.03-79.3-93.66-30.3-5.04-61.1 4.84-82.8 25.66l-46.8 46.8z"></path>
    </svg>
  );
};
