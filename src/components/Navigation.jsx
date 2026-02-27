import React from "react";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navigation = ({ path, text }) => {
    const navigate = useNavigate();
  return (
    <div className=" bg-gradient-to-r border-t-4 lg:px-16 border-orange-400 from-[#2f0000] via-[#9e0f0f] to-[#2f0000] text-white px-4 py-2 text-sm font-medium flex items-center gap-3">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1  transition-colors duration-200"
      >
        <FiHome size={16} />
        <span>Beranda</span>
      </button>

      <span className="text-gray-400">/</span>

      <span className="text-yellow-500">{text}</span>
    </div>
  );
};

export default Navigation;