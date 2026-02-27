import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWa = () => {
  const phoneNumber = "6285173284821"; // format tanpa 0 depan
  const message =
    "Halo%2C%20saya%20menghubungi%20melalui%20website%20PPID%20Sekadau.%20Nama%20saya%3A";

  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-2 lg:right-6 right-2 z-40 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md shadow-lg transition duration-300"
    >
      <FaWhatsapp size={20} />
      <span className="text-xs md:inline font-medium">
        Chat via WhatsApp
      </span>
    </a>
  );
};

export default FloatingWa;
