import { CategoryType as Props } from "../UI/Categories";
import { motion } from "framer-motion";

import { useTravelContext } from "../helper-functions/useTravelContext";

export const ArtSVG = ({ value }: Props) => {
  const travelCtx = useTravelContext();
  const toggleFetch = () => {
    travelCtx.toggleUserSearch(value);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full shadow-2xl cursor-pointer bg-lightpurpleOne w-fit"
      onClick={toggleFetch}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
        className="h-20 rounded-full"
      >
        <circle cx="256" cy="256" r="256" fill="#273b7a"></circle>
        <path
          fill="#121149"
          d="M306.045 507.095c96.434-19.113 173.378-92.375 197.806-186.785L309.544 126.005 182.718 242.483l25.941 46.559-50.424 70.246 147.81 147.807z"
        ></path>
        <path
          fill="#fff"
          d="M361.794 227.102c-3.17.465-6.456.581-9.814.307-20.575-1.676-37.245-18.322-38.943-38.896-.681-8.247.986-16.053 4.406-22.823 8.868-17.558.814-39.081-17.91-45.109-15.089-4.858-31.28-7.261-48.107-6.732-76.674 2.412-138.138 66.372-137.647 143.082.505 78.615 64.793 142.095 143.715 141.283 75.524-.776 137.871-61.478 140.631-136.954.019-.503.034-1.005.047-1.505.516-19.715-16.865-35.516-36.378-32.653zm-93.727 46.999c-15.71 0-28.444-12.734-28.444-28.444s12.734-28.444 28.444-28.444 28.444 12.734 28.444 28.444-12.735 28.444-28.444 28.444z"
        ></path>
        <path
          fill="#d0d1d3"
          d="M361.794 227.102c-3.17.465-6.456.581-9.814.307-20.575-1.676-37.245-18.322-38.943-38.896-.681-8.247.986-16.053 4.406-22.823 8.868-17.558.814-39.081-17.91-45.109-13.715-4.417-28.348-6.777-43.536-6.777v106.122a28.273 28.273 0 0112.067-2.715c15.71 0 28.444 12.734 28.444 28.444 0 15.71-12.734 28.444-28.444 28.444-4.32 0-8.399-.991-12.067-2.715v126.805c.5 0 .993.028 1.495.022 75.524-.776 137.871-61.478 140.631-136.954.019-.503.034-1.005.047-1.505.518-19.712-16.863-35.513-36.376-32.65z"
        ></path>
        <circle cx="243.778" cy="173.528" r="20.704" fill="#ff7f4f"></circle>
        <circle cx="178.941" cy="207.748" r="20.704" fill="#eaa22f"></circle>
        <circle cx="167.236" cy="282.479" r="20.704" fill="#8bc180"></circle>
        <circle cx="208.662" cy="341.919" r="20.704" fill="#71e2ef"></circle>
        <circle cx="286.099" cy="341.919" r="20.704" fill="#02b2b2"></circle>
        <circle cx="333.576" cy="282.479" r="20.704" fill="#59595b"></circle>
      </svg>
    </motion.div>
  );
};
