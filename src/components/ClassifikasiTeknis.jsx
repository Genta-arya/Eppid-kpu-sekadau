import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Constants/Constants";
import ScrollFadeIn from "./ScrollAnimated";

const ClassifikasiTeknis = () => {
  return (
    <section className="bg-gray-200 py-24 w-full">
         <ScrollFadeIn amount={0.1} direction="bottom">

      <div className="w-full mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold uppercase text-gray-700 mb-16">
          Klasifikasi Informasi Publik
        </h2>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:px-32">
          {Icon.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log("click")}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center space-y-4 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-red-900 bg-white shadow-md">
                <img
                  src={item.iconLink}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <p className="font-bold uppercase text-gray-700 text-sm">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
         </ScrollFadeIn>
    </section>
  );
};

export default ClassifikasiTeknis;
