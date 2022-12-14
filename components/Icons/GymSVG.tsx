import { CategoryType as Props } from "../UI/Categories";
import { motion } from "framer-motion";
import { useTravelContext } from "../helper-functions/useTravelContext";

export const GymSVG = ({ value }: Props) => {
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
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
        className="h-20 rounded-full"
      >
        <circle cx="256" cy="256" r="256" fill="#d35933"></circle>
        <path
          fill="#b54324"
          d="M499.486 335.22l-64.512-64.512-78.384 26.939-172.227-172.226-40.129 41.51v55.468l-44.841-12.681 44.841 44.839v24.716l-3.527 8.54-63.938 10.135 70.658 70.658-3.193 10.547v14.686l-38.684 9.623 104.401 104.401A257.718 257.718 0 00256 512c113.733 0 210.125-74.174 243.486-176.78z"
        ></path>
        <path
          fill="#fff"
          d="M173.684 380.552h-19.825V179.286a8.62 8.62 0 00-17.24 0v201.266h-19.825c-7.854 0-14.222 6.368-14.222 14.222 0 7.854 6.368 14.222 14.222 14.222h56.889c7.854 0 14.222-6.368 14.222-14.222.001-7.854-6.367-14.222-14.221-14.222z"
        ></path>
        <path
          fill="#d0d1d3"
          d="M398.222 380.552h-19.825v-96.108a8.62 8.62 0 00-17.24 0v96.108h-19.825c-7.854 0-14.222 6.368-14.222 14.222 0 7.854 6.368 14.222 14.222 14.222h56.889c7.854 0 14.222-6.368 14.222-14.222.001-7.854-6.367-14.222-14.221-14.222z"
        ></path>
        <path
          fill="#fee187"
          d="M421.926 303.407H90.074c-10.473 0-18.963-8.49-18.963-18.963s8.49-18.963 18.963-18.963h331.852c10.473 0 18.963 8.49 18.963 18.963s-8.49 18.963-18.963 18.963z"
        ></path>
        <path
          fill="#ffc61b"
          d="M421.926 265.481H255.857v37.926h166.069c10.473 0 18.963-8.49 18.963-18.963s-8.49-18.963-18.963-18.963z"
        ></path>
        <circle cx="145.239" cy="170.96" r="60.049" fill="#3f3b3b"></circle>
        <path
          fill="#272525"
          d="M145.239 110.904c-.145 0-.286.01-.431.01v120.077c.145.002.286.01.431.01 33.164 0 60.049-26.884 60.049-60.049 0-33.162-26.884-60.048-60.049-60.048z"
        ></path>
        <circle cx="145.239" cy="170.96" r="48.04" fill="#808183"></circle>
        <path
          fill="#59595b"
          d="M145.239 122.914c-.145 0-.286.01-.431.01v96.058c.145.002.286.01.431.01 26.531 0 48.04-21.507 48.04-48.038s-21.509-48.04-48.04-48.04z"
        ></path>
        <circle cx="145.239" cy="170.96" r="16.984" fill="#3f3b3b"></circle>
        <path
          fill="#272525"
          d="M157.248 158.944c-3.425-3.427-7.951-5.067-12.44-4.954v33.928c4.489.114 9.014-1.527 12.44-4.955 6.633-6.632 6.633-17.385 0-24.019z"
        ></path>
        <circle cx="145.239" cy="170.96" r="6.551" fill="#ffedb5"></circle>
      </svg>
    </motion.div>
  );
};
