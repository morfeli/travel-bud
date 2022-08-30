import { Data as iData } from "./SearchBar";
import { motion } from "framer-motion";

type DestinationCardProps = {
  error: boolean;
  loading: boolean;
  data: iData[];
};

export const Venues = ({ error, loading, data }: DestinationCardProps) => {
  if (error) {
    return <p>There has been an error, please try again!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-col py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:mx-auto">
      {data.map((item, i) => (
        <motion.div
          initial={{
            opacity: 0,
            translateX: i % 2 === 0 ? -50 : 50,
            translateY: -50,
          }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={item.fsq_id}
          className="self-center p-2 my-2 rounded-md cursor-pointer w-80 bg-lightpurpleOne sm:w-52"
        >
          <h2>{item.name}</h2>
          <p>
            {item.location.address}, {item.location.locality}
          </p>
        </motion.div>
      ))}
    </section>
  );
};
