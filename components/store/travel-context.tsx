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
  toggleDarkMode: () => void;
};

const travelAppDefaultState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  objectID: "",
  darkMode: false,
  toggleDarkMode: () => {},
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

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.user.name.userName);
      setEmail(session.user.name.email);
      setFirstName(session.user.name.firstName);
      setLastName(session.user.name.lastName);
      setObjectID(session.user.name.objectId);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => !current);
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
    }),
    [userName, email, firstName, lastName, objectID, toggleDarkMode, darkMode]
  );

  return (
    <TravelContext.Provider value={state}>{children}</TravelContext.Provider>
  );
};
