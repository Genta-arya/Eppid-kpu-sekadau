import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Constants/Constants";
import ScrollFadeIn from "./ScrollAnimated";
const ProsedurLayanan = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold uppercase text-gray-700 mb-16">
          Prosedur Pelayanan Informasi
        </h2>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:px-32">
          {Icon.slice(4, 8).map((item, index) => {
            const directions = ["left", "zoom", "blur", "right"];

            return (
              <ScrollFadeIn
                key={item.id}
                direction={directions[index]}
                delay={index * 0.15}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProsedurLayanan;
