import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import maklumatImage from "../assets/maklumat.jpg";

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const ModalMaklumat = () => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const guideDone = localStorage.getItem("guideDone");

    if (!guideDone) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  // 🔒 Lock scroll background
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative max-h-[90vh] overflow-y-auto"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              <div className="bg-white hover:border-gray-400 hover:border-2 rounded-full p-1 ml-10">
                <FiX size={24} />
              </div>
            </button>

            {/* Content */}
            <img
              src={maklumatImage}
              alt="Maklumat"
              onClick={() => window.open(maklumatImage, "_blank")}
              className="w-96 lg:w-[550px]  cursor-pointer rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalMaklumat;
