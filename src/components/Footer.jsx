import { Target } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#2f0000] via-[#9e0f0f] to-[#2f0000]  shadow-md text-white py-6">
      <div className="lg:text-start text-center px-4 mx-auto lg:px-16 text-xs font-bold">
        <p>
          <span className="text-gray-400 font-semibold">
            {" "}
            All copyrights reserved &copy; {new Date().getFullYear()} -
            Developed by{" "}
          </span>
          <Link className="hover:opacity-45" to={"https://kab-sekadau.kpu.go.id/"} target={"_blank"}>Komisi Pemilihan Umum Kabupaten Sekadau.</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
