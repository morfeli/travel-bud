import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";

import { useSession } from "next-auth/react";

type TravelProviderProps = {
  children: React.ReactNode;
};

type TravelAppContextType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  objectID: string;
  darkMode: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  toggleDarkMode: () => void;
  toggleCoordinates: (value: any) => void;
};

const travelAppDefaultState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  objectID: "",
  darkMode: false,
  coordinates: {
    lat: 0,
    lng: 0,
  },
  toggleDarkMode: () => {},
  toggleCoordinates: () => {},
};

export const TravelContext = createContext<TravelAppContextType>(
  travelAppDefaultState
);

export const TravelAppProvider = ({ children }: TravelProviderProps) => {
  const { data: session, status } = useSession();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [objectID, setObjectID] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.user.name.userName);
      setEmail(session.user.name.email);
      setFirstName(session.user.name.firstName);
      setLastName(session.user.name.lastName);
      setObjectID(session.user.name.objectId);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => !current);
  }, []);

  const toggleCoordinates = useCallback((value: any) => {
    setCoordinates(value);
  }, []);

  const state = useMemo(
    () => ({
      userName,
      email,
      firstName,
      lastName,
      objectID,
      darkMode,
      toggleDarkMode,
      coordinates,
      toggleCoordinates,
    }),
    [
      userName,
      email,
      firstName,
      lastName,
      objectID,
      toggleDarkMode,
      darkMode,
      coordinates,
      toggleCoordinates,
    ]
  );

  return (
    <TravelContext.Provider value={state}>{children}</TravelContext.Provider>
  );
};
