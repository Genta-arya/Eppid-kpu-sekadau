"use client";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

const ScrollFadeIn = ({ children, direction = "bottom", amount }) => {
  const [mounted, setMounted] = useState(false);

  const initialPosition = useMemo(() => {
    let x = 0;
    let y = 0;

    switch (direction) {
      case "left":
        x = -100;
        break;
      case "right":
        x = 100;
        break;
      case "bottom":
        y = 100;
        break;
      case "top":
        y = -100;
        break;
      default:
        y = 100;
    }

    return { x, y };
  }, [direction]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="overflow-visible">
      <motion.div
        initial={{
          opacity: 0,
          x: initialPosition.x,
          y: initialPosition.y,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: amount }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollFadeIn;
