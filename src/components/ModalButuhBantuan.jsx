import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ModalButuhBantuan = ({ onClose }) => {
  const navigate = useNavigate();

  const handleWhatsapp = () => {
    const phoneNumber = "6285173284821";
    const message = encodeURIComponent(
      "Halo, saya membutuhkan bantuan terkait penggunaan E-PPID.",
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handlePanduan = () => {
    navigate("/panduan-penggunaan");
    onClose();
  };

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Butuh Bantuan?
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Silakan pilih salah satu opsi berikut untuk mendapatkan bantuan
            terkait penggunaan layanan E-PPID.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleWhatsapp}
              className="w-full text-sm bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Hubungi CS PPID (WhatsApp)
            </button>

            <button className="w-full text-sm border border-red-800 text-red-800  hover:opacity-80 py-3 rounded-xl font-semibold transition">
              Lihat Panduan Penggunaan E-PPID
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ModalButuhBantuan;
