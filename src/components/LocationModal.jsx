import React from "react";
import { toast } from "sonner";

const LocationModal = ({ refreshPermission }) => {
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        refreshPermission();
      },
      () => {
        toast.info("Silakan aktifkan izin lokasi di pengaturan browser.");
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold mb-3">
          Izin Akses Lokasi
        </h2>

        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Website ini meminta izin akses lokasi Anda untuk keperluan 
          <span className="font-medium"> analitik data pengunjung</span> 
          dan peningkatan kualitas layanan.
        </p>

        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Informasi lokasi digunakan secara terbatas untuk kebutuhan 
          statistik dan evaluasi layanan, serta tidak dibagikan 
          kepada pihak lain tanpa dasar hukum yang berlaku.
        </p>

        <button
          onClick={requestLocation}
          className="w-full rounded-xl bg-red-600 py-3 text-white font-medium hover:bg-red-700 transition"
        >
          Izinkan Lokasi
        </button>
      </div>
    </div>
  );
};

export default LocationModal;