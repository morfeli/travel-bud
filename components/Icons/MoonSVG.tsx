import { useTravelContext } from "../helper-functions/useTravelContext";

export const MoonSVG = () => {
  const travelCtx = useTravelContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={travelCtx.darkMode ? "white" : "black"}
    >
      <path d="M12 10.999A4.51 4.51 0 0114.999 14 4.52 4.52 0 0118 11a4.521 4.521 0 01-3.001-3A4.509 4.509 0 0112 10.999zm8.001.001a3.011 3.011 0 012 2.001A3.006 3.006 0 0124 11a3.012 3.012 0 01-2-2 3.01 3.01 0 01-1.999 2zm-1-9a4.514 4.514 0 01-2.998 3.001 4.52 4.52 0 013.001 3.002A4.515 4.515 0 0122 5.001 4.522 4.522 0 0119.001 2zM12 24C5.383 24 0 18.617 0 12S5.383 0 12 0c1.894 0 3.63.497 5.37 1.179C14.422 1.683 8 4.445 8 12c0 7.454 5.917 10.208 9.37 10.821C15.87 23.667 13.894 24 12 24z"></path>
    </svg>
  );
};
