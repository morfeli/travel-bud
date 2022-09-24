import { HeartSVG } from "../Icons/HeartSVG";
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
}: SaveButtonProps) => {
  const [userSaved, setUserSaved] = useState<boolean>(false);

  const userStateVenueIDS = userStateData.map((item) => item.id);

  const toggleSaveStyle = () => {
    setUserSaved(true);
  };

  const onClick = () => {
    toggleSaveStyle();

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

  let style;

  if (userSavedIDS.includes(itemID) || userStateVenueIDS.includes(itemID)) {
    style = true;
  } else {
    style = false;
  }

  return (
    <button
      className="flex w-4 h-4"
      name="saveButton"
      value={itemID}
      onClick={onClick}
    >
      <HeartSVG userSaved={userSaved} style={style} />
    </button>
  );
};
