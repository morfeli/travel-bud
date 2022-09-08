import { HeartSVG } from "../Icons/HeartSVG";
import { useState } from "react";

type SaveButtonProps = {
  itemID: string;
  name: string;
  address: string;
  locality: string;
  email: string;
  objectID: string;
};

export const SaveButton = ({
  itemID,
  name,
  address,
  locality,
  email,
  objectID,
}: SaveButtonProps) => {
  console.log(objectID);
  const [userSaved, setUserSaved] = useState<boolean>(false);

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

  return (
    <button
      className="z-50 flex w-4 h-4"
      name="saveButton"
      value={itemID}
      onClick={onClick}
    >
      <HeartSVG userSaved={userSaved} />
    </button>
  );
};
