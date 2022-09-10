import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from "react";
import { useTravelContext } from "../helper-functions/useTravelContext";

const accessToken = `pk.eyJ1IjoibW9yZmVsaWRldiIsImEiOiJjbDd1ejd5YjAwNnBzM3ZvZndmdDNjNWsyIn0.g0iJ6AXu0BpSX9aD2BGtLA`;

type MapProps = {
  markerCords: {
    lat: number;
    lng: number;
  }[];
};

export const Map = ({ markerCords }: MapProps) => {
  const travelCtx = useTravelContext();
  const mapContainer = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [zoom, setZoom] = useState<number>(10);

  const lat = travelCtx.userCoordinates.lat;
  const lng = travelCtx.userCoordinates.lng;

  useEffect(() => {
    const node = mapContainer.current;
    if (typeof window === "undefined" || node === null) return;
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: accessToken,
      style: travelCtx.darkMode
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
      anchor: "center",
    })
      .setLngLat([lng, lat])
      .addTo(mapboxMap);

    markerCords.map((item) => {
      return new mapboxgl.Marker({
        anchor: "center",
      })
        .setLngLat([item.lng, item.lat])
        .addTo(mapboxMap);
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, [markerCords, travelCtx]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-96" />
    </div>
  );
};
