import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";

type TravelProviderProps = {
  children: React.ReactNode;
};

type TravelAppContextType = {
  data: any[];
  nearByData: any[];
  activeTab: string;
  userSearch: string;
  loading: boolean;
  error: boolean;
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
  toggleTab: (value: string) => void;
  toggleUserSearch: (value: string) => void;
  fetchData: () => void;
  toggleDarkMode: () => void;
  toggleCoordinates: (value: any) => void;
};

const travelAppDefaultState = {
  data: [""],
  nearByData: [""],
  activeTab: "",
  userSearch: "",
  loading: false,
  error: false,
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
  toggleTab: () => {},
  toggleUserSearch: () => {},
  fetchData: () => {},
  toggleDarkMode: () => {},
  toggleCoordinates: () => {},
};

export const TravelContext = createContext<TravelAppContextType>(
  travelAppDefaultState
);

export const TravelAppProvider = ({ children }: TravelProviderProps) => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [nearByData, setNearByData] = useState([]);
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

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3xR8XOiv7Lq6kjje+r8k78gDySBpeuTW6Rr3BHtZ0j2M=",
    },
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setUserCoordinates({ lat: latitude, lng: longitude });
          setMapCoordinates({ lat: latitude, lng: longitude });
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
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
    if (userSearch.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    }

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${userSearch}&ll=${userCoordinates.lat}%2C${userCoordinates.lng}&limit=12`,
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

  useEffect(() => {
    if (userLocation.locality === "") {
      return;
    }

    const locality = encodeURIComponent(userLocation.locality);
    const state = userLocation.principalSubdivision;

    const searchKey = `${locality}%2C%20${state}`;

    fetch(
      `https://api.foursquare.com/v3/places/search?near=${searchKey}&limit=12`,
      options
    ).then((res) => res.json().then((data) => setNearByData(data.results)));
  }, [userLocation.locality, userLocation.principalSubdivision]);

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

  const toggleTab = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const state = useMemo(
    () => ({
      fetchData,
      data,
      nearByData,
      userSearch,
      loading,
      error,
      darkMode,
      toggleDarkMode,
      mapCoordinates,
      userCoordinates,
      toggleCoordinates,
      toggleUserSearch,
      userLocation,
      activeTab,
      toggleTab,
    }),
    [
      fetchData,
      data,
      nearByData,
      userSearch,
      loading,
      error,
      toggleDarkMode,
      darkMode,
      mapCoordinates,
      toggleCoordinates,
      userCoordinates,
      toggleUserSearch,
      userLocation,
      activeTab,
      toggleTab,
    ]
  );

  return (
    <TravelContext.Provider value={state}>{children}</TravelContext.Provider>
  );
};
