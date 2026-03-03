import React from "react";
import { motion } from "framer-motion";
import { FileText, Megaphone, ClipboardList, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Animated from "./Animated";

const menuItems = [
  {
    title: "Formulir Permohonan Informasi",
    icon: <FileText size={28} />,
    link: "/formulir-informasi",
  },
  {
    title: "Formulir Pengajuan Keberatan",
    icon: <Megaphone size={28} />,
    link: "/formulir-keberatan",
  },
  {
    title: "Cek Status Permohonan & Keberatan Informasi",
    icon: <ClipboardList size={28} />,
    link: "/ticket",
  },
  {
    title: "Daftar Informasi Publik Online",
    icon: <Search size={28} />,
    link: "/#",
  },
];

// Item animation
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Animated direction={"vertical"} distance={30}>
      <div className="flex items-center justify-center py-10">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:px-0 px-2 lg:max-w-5xl">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(item.link)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex items-center gap-3 px-8 py-5 rounded-full 
             bg-gradient-to-r from-red-700 to-red-950 
             text-white font-semibold text-sm
             shadow-lg cursor-pointer transition-all duration-300"
            >
              {/* 🔶 LEFT BORDER ANIMATION */}
              <span className="absolute inset-0 rounded-full pointer-events-none">
                <span
                  className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-orange-400
                 scale-x-0 origin-left
                 group-hover:scale-x-100
                 transition-transform duration-500 ease-out"
                />
              </span>

              {/* 🔶 RIGHT BORDER ANIMATION */}
              <span className="absolute inset-0 rounded-full pointer-events-none">
                <span
                  className="absolute right-0 top-0 h-full w-full rounded-full border-4 border-orange-400
                 scale-x-0 origin-right
                 group-hover:scale-x-100
                 transition-transform duration-500 ease-out delay-75"
                />
              </span>

              {/* ✨ Shine Effect */}
              <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <span
                  className="absolute -left-1/2 top-0 h-full w-1/2 
                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                 skew-x-[-20deg]
                 translate-x-[-150%]
                 group-hover:translate-x-[300%]
                 transition-transform duration-700 ease-out"
                />
              </span>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3">
                <div>{item.icon}</div>
                <span>{item.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Animated>
  );
};

export default Menu;
