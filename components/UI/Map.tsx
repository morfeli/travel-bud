import GoogleMapReact from "google-map-react";
import { useTravelContext } from "../helper-functions/useTravelContext";
import { mapStylesLightMode } from "./MapStylesLightMode";
import { mapStylesDarkMode } from "./MapStylesDarkMode";

export const Map = () => {
  const travelCtx = useTravelContext();

  return (
    <div className="w-screen p-2 mx-auto mt-2 h-72">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDw589TUlV83Kt-bXfqA0QN61VP9blecGM" }}
        center={travelCtx.coordinates}
        defaultZoom={10}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: travelCtx.darkMode ? mapStylesDarkMode : mapStylesLightMode,
        }}
        // onChange={(e) => console.log(e)}
      ></GoogleMapReact>
    </div>
  );
};
