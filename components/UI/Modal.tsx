import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useEffect } from "react";
import { useRouter } from "next/router";

type ModalProps = {
  active: boolean;
  status: string | boolean;
  color: string;
};

export const Modal = ({ active, status, color }: ModalProps) => {
  const router = useRouter();
  if (!status) {
    return null;
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 10 },
  };

  const divStyle = classNames(
    "flex",
    "items-center",
    "justify-center",
    "p-4",
    "mx-4",
    "rounded-md",
    color
  );

  useEffect(() => {
    active &&
      setTimeout(() => {
        router.replace("/dashboard");
      }, 6000);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "spring", stiffness: 100 }}
          className={divStyle}
        >
          <p className="text-white">{status}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
