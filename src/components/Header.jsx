import React from "react";
import { motion } from "framer-motion";
import img_header from "../assets/slider.png";

const Header = () => {
  return (
    <div className="relative w-full pt-24 overflow-hidden">
      
      {/* Image Fade In */}
      <motion.img
        src={img_header}
        alt="Header"
        className="w-full lg:h-auto h-40 object-fill"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Overlay Fade */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default Header;