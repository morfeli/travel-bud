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
  destinationWeatherData: {
    mainTemp: number;
    sunset: number;
    sunrise: number;
    weatherDescMain: string;
    weatherDesc: string;
    icon: string;
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
  destinationWeatherData: {
    mainTemp: 0,
    sunset: 0,
    sunrise: 0,
    weatherDescMain: "",
    weatherDesc: "",
    icon: "",
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
  const [destinationWeatherData, setDestinationWeatherData] = useState<{
    mainTemp: number;
    sunset: number;
    sunrise: number;
    weatherDescMain: string;
    weatherDesc: string;
    icon: string;
  }>({
    mainTemp: 0,
    sunset: 0,
    sunrise: 0,
    weatherDescMain: "",
    weatherDesc: "",
    icon: "",
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

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${mapCoordinates.lat}&lon=${mapCoordinates.lng}&units=imperial&appid=c72c45667ef9cbf16ca0a6a26fb60435`
    )
      .then((res) => res.json())
      .then((data) => {
        const mainTemp = data.main.temp;
        const sunset = data.sys.sunset;
        const sunrise = data.sys.sunrise;
        const weatherDescMain = data.weather[0].main;
        const weatherDesc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const weatherData = {
          mainTemp,
          sunset,
          sunrise,
          weatherDesc,
          weatherDescMain,
          icon,
        };

        setDestinationWeatherData(weatherData);
      });
  }, [mapCoordinates]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => !current);
  }, []);

  const toggleCoordinates = useCallback((value: any) => {
    setMapCoordinates(value);
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
      mapCoordinates,
      userCoordinates,
      toggleCoordinates,
      userLocation,
      destinationWeatherData,
    }),
    [
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
      userLocation,
      destinationWeatherData,
    ]
  );

  return (
    <TravelContext.Provider value={state}>{children}</TravelContext.Provider>
  );
};
