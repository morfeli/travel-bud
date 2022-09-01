import { CategoryType as Props } from "../UI/Categories";
import { motion } from "framer-motion";
import { useTravelContext } from "../helper-functions/useTravelContext";

export const ParkSVG = ({ value }: Props) => {
  const travelCtx = useTravelContext();
  const toggleFetch = () => {
    travelCtx.toggleUserSearch(value);
  };
  return (
    <motion.div
      className="rounded-full shadow-2xl cursor-pointer bg-lightpurpleOne w-fit"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleFetch}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 439.48 439.48"
        viewBox="0 0 439.48 439.48"
        className="h-20 rounded-full"
      >
        <path
          fill="#07a521"
          d="M383.555 328.382h-30.33c-11.15 0-19.93-9.49-19.07-20.61l9.05-116.74c.78-9.96 9.08-17.65 19.07-17.65h42.56c9.99 0 18.3 7.69 19.07 17.65l9.05 116.74c.86 11.12-7.92 20.61-19.07 20.61h-30.33zm-286.173-.001H46.225c-11.15 0-19.93-9.49-19.07-20.61l9.05-116.74c.78-9.96 9.08-17.65 19.07-17.65h42.56c9.99 0 18.29 7.69 19.07 17.65l3.36 43.35h-3.11c-7.28 0-13.33 5.6-13.9 12.86l-3.31 42.71-.89-.07-1.673 38.5z"
        ></path>
        <path
          fill="#0fbc30"
          d="M88.905 219.031c-.78-9.96-9.08-17.65-19.07-17.65H35.403l.802-10.35c.78-9.96 9.08-17.65 19.07-17.65h42.56c9.99 0 18.29 7.69 19.07 17.65l9.05 116.74c.86 11.12-7.92 20.61-19.07 20.61h-9.503l-8.477-109.35zm282.3 0c.78-9.96 9.08-17.65 19.07-17.65h34.432l-.802-10.35c-.78-9.96-9.08-17.65-19.07-17.65h-42.56c-9.99 0-18.29 7.69-19.07 17.65l-9.05 116.74c-.86 11.12 7.92 20.61 19.07 20.61h9.503l8.477-109.35z"
        ></path>
        <path
          fill="#0fbc30"
          d="M167.195 339.621c-2.28 4.53-6.97 7.67-12.45 7.67h-44.19c-5.48 0-10.17-3.14-12.45-7.67-1.1-2.19-1.65-4.7-1.44-7.34l.3-3.9 2.98-38.43 3.31-42.71c.57-7.26 6.62-12.86 13.9-12.86h31c7.27 0 13.33 5.6 13.89 12.86l6.6 85.04c.2 2.64-.34 5.15-1.45 7.34z"
        ></path>
        <path
          fill="#07a521"
          d="M167.195 339.621c-2.28 4.53-6.97 7.67-12.45 7.67h-44.19c-5.48 0-10.17-3.14-12.45-7.67l1.84-23.67 3.31-42.71c.57-7.26 6.62-12.86 13.9-12.86h31c7.27 0 13.33 5.6 13.89 12.86l5.15 66.38z"
        ></path>
        <path
          fill="#ffd039"
          d="M306.555 352.218v-36.5a6.5 6.5 0 00-6.5-6.5h-89.75a6.5 6.5 0 00-6.5 6.5v36.5h-10.75v13h10.75v32h13v-32h76.75v32h13v-32h10.75v-13h-10.75zm-13 0h-76.75v-6.64h76.75v6.64z"
        ></path>
        <path
          fill="#9b6121"
          d="M95.875 286.702l6.36 6.36-21.18 21.18v83.809h-9V292.242l-21.18-21.18 6.36-6.36 14.82 14.809v-27.46h9v10.46l14.82-14.809 6.36 6.36-21.18 21.18v26.269zm313.36-15.64l-21.18 21.18v105.809h-9v-83.809l-21.18-21.18 6.36-6.36 14.82 14.809v-26.269l-21.18-21.18 6.36-6.36 14.82 14.809v-10.46h9v27.46l14.82-14.809zm-260.45 38.23l-11.63 6.649v82.11h-9v-82.04l-12.38-7.25 4.56-7.759 7.82 4.579v-13.89h9v13.88l7.17-4.099z"
        ></path>
        <path
          fill="#562f15"
          d="M95.875 286.702l6.36 6.36-21.18 21.18v20.429h-9v-42.429l-21.18-21.18 6.36-6.36 14.82 14.809v-27.46h9v10.46l14.82-14.809 6.36 6.36-21.18 21.18v26.269zm52.91 22.59l-11.63 6.649v15.73h-9v-15.66l-12.38-7.25 4.56-7.759 7.82 4.579v-13.89h9v13.88l7.17-4.099zm260.45-38.23l-21.18 21.18v47.429h-9v-25.429l-21.18-21.18 6.36-6.36 14.82 14.809v-26.269l-21.18-21.18 6.36-6.36 14.82 14.809v-10.46h9v27.46l14.82-14.809z"
        ></path>
        <path
          fill="#eab932"
          d="M203.805 365.218h13v7.62h-13zm89.75 0h13v7.62h-13z"
        ></path>
        <path
          fill="#0fbc30"
          d="M439.48 419.228H0c0-4.43 1.13-8.59 3.12-12.22 1.17-2.14 2.64-4.09 4.35-5.8a25.39 25.39 0 0118.03-7.47h388.48c9.65 0 18.05 5.36 22.38 13.27a25.333 25.333 0 013.12 12.22z"
        ></path>
        <path
          fill="#07a521"
          d="M439.48 419.228H0c0-4.43 1.13-8.59 3.12-12.22h433.24a25.333 25.333 0 013.12 12.22z"
        ></path>
        <path
          fill="#666"
          d="M357.843 71.387a25.346 25.346 0 00-1.508 1.977c-1.005-1.486-2.146-2.875-3.443-4.094-6.334-5.954-14.966-9.021-23.547-6.685 2.593.995 5.167 1.807 7.585 3.208 3.423 1.984 6.505 4.539 8.906 7.699 1.694 2.229 3.109 4.744 4.02 7.398.739 2.153 1.261 4.43 1.415 6.706.028.408-.148 1.465.067 1.809.012.019.01.02.018.034-.002.098-.014.195-.015.292-.045 3.215 2.923 5.751 6.107 5.034 2.622-.59 3.835-2.854 3.853-5.316.234-.58.229-2.82.315-3.476.811-6.127 3.895-11.518 8.24-15.799 1.906-1.878 4.199-3.512 6.57-4.733 2.251-1.16 4.553-1.959 6.916-2.857-9.49-2.647-19.311 1.467-25.499 8.803z"
        ></path>
        <path
          fill="#eab932"
          d="M137.685 20.251c27.75 0 50.24 22.5 50.24 50.25s-22.49 50.25-50.24 50.25-50.25-22.5-50.25-50.25 22.5-50.25 50.25-50.25z"
        ></path>
        <path
          fill="#ffd039"
          d="M187.925 70.501c0 27.75-22.49 50.25-50.24 50.25-6.12 0-11.98-1.09-17.4-3.1a49.928 49.928 0 01-3.1-17.4c0-27.75 22.49-50.25 50.25-50.25 6.11 0 11.97 1.09 17.39 3.09 2.01 5.43 3.1 11.29 3.1 17.41z"
        ></path>
        <path
          fill="#3b9dff"
          d="M260.225 106.511c2.79 2.78 4.51 6.62 4.51 10.87 0 8.49-6.89 15.37-15.38 15.37h-88.74c-4.25 0-8.09-1.72-10.87-4.5a15.346 15.346 0 01-4.25-8.11c-.17-.89-.25-1.82-.25-2.76 0-8.49 6.88-15.38 15.37-15.38h-22.25c-4.24 0-8.09-1.72-10.87-4.5a15.303 15.303 0 01-4.51-10.87c0-8.49 6.89-15.37 15.38-15.37h53c4.24 0 8.09 1.72 10.87 4.5 2.79 2.78 4.51 6.63 4.51 10.87 0 8.49-6.89 15.37-15.38 15.37h57.99c4.25 0 8.09 1.72 10.87 4.51z"
        ></path>
      </svg>
    </motion.div>
  );
};
