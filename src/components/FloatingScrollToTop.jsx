import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FloatingScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-12 right-6 w-14 h-14 flex items-center justify-center z-50"
        >
          <svg
            className="absolute w-14 h-14 rotate-[-90deg]"
            viewBox="0 0 60 60"
          >
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#991b1b"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="bg-red-800 hover:bg-red-900 text-white p-3 rounded-full shadow-lg">
            <FiArrowUp size={18} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingScrollToTop;