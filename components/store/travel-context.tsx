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
  data: any[];
  userSearch: string;
  loading: boolean;
  error: boolean;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  objectID: string;
  darkMode: boolean;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  userCoordinates: {
    lat: number;
    lng: number;
  };
  userLocation: {
    city: string;
    locality: string;
    principalSubdivision: string;
  };
  toggleUserSearch: (value: string) => void;
  fetchData: () => void;
  toggleDarkMode: () => void;
  toggleCoordinates: (value: any) => void;
};

const travelAppDefaultState = {
  data: [""],
  userSearch: "",
  loading: false,
  error: false,
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  objectID: "",
  darkMode: false,
  mapCoordinates: {
    lat: 0,
    lng: 0,
  },
  userCoordinates: {
    lat: 0,
    lng: 0,
  },
  userLocation: {
    city: "",
    locality: "",
    principalSubdivision: "",
  },
  toggleUserSearch: () => {},
  fetchData: () => {},
  toggleDarkMode: () => {},
  toggleCoordinates: () => {},
};

export const TravelContext = createContext<TravelAppContextType>(
  travelAppDefaultState
);

export const TravelAppProvider = ({ children }: TravelProviderProps) => {
  const { data: session, status } = useSession();

  const [userSearch, setUserSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [objectID, setObjectID] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const [userLocation, setUserLocation] = useState<{
    city: string;
    locality: string;
    principalSubdivision: string;
  }>({ city: "", locality: "", principalSubdivision: "" });

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
        setUserCoordinates({ lat: latitude, lng: longitude });
        setMapCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (userCoordinates.lat === 0 && userCoordinates.lng === 0) {
      return;
    }
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${userCoordinates.lat}&longitude=${userCoordinates.lng}&localityLanguage=en&key=bdc_ce142ca2242b401bb3b1e5dd86775bfb`
    )
      .then((res) => res.json())
      .then((data) => setUserLocation(data));
  }, [userCoordinates]);

  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3xR8XOiv7Lq6kjje+r8k78gDySBpeuTW6Rr3BHtZ0j2M=",
      },
    };

    if (userSearch.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    }

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${userSearch}&ll=${userCoordinates.lat}%2C${userCoordinates.lng}`,
      options
    )
      .then((res) => res.json())

      .then((data) => {
        setLoading(true);
        setData(data.results);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => setError(err));
  };

  const toggleUserSearch = useCallback((value: string) => {
    setUserSearch(value);
  }, []);

  useEffect(() => {
    if (userSearch.trim() === "") {
      return;
    }
    fetchData();
  }, [userSearch]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => !current);
  }, []);

  const toggleCoordinates = useCallback((value: any) => {
    setMapCoordinates(value);
  }, []);

  const state = useMemo(
    () => ({
      fetchData,
      data,
      userSearch,
      loading,
      error,
      userName,
      email,
      firstName,
      lastName,
      objectID,
      darkMode,
      toggleDarkMode,
      mapCoordinates,
      userCoordinates,
      toggleCoordinates,
      toggleUserSearch,
      userLocation,
    }),
    [
      fetchData,
      data,
      userSearch,
      loading,
      error,
      userName,
      email,
      firstName,
      lastName,
      objectID,
      toggleDarkMode,
      darkMode,
      mapCoordinates,
      toggleCoordinates,
      userCoordinates,
      toggleUserSearch,
      userLocation,
    ]
  );

  return (
    <TravelContext.Provider value={state}>{children}</TravelContext.Provider>
  );
};
