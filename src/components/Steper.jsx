import React from "react";
import Stepper, { Step } from "./Stepper";
import {
  FaTimesCircle,
  FaInfoCircle,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";

const Stepers = ({ data, fulldata }) => {
  const catatan = fulldata?.catatanAdmin;
  const phoneNumber = "6285173284821";
  const rawCaraMemperoleh = fulldata?.caraMemperoleh;

  // Mapping Kalimat agar mudah dibaca
  const mapCaraMemperoleh = (val) => {
    switch (val) {
      case "WHATSAPP":
        return "dikirimkan melalui pesan WhatsApp";
      case "EMAIL":
        return "dikirimkan melalui alamat Email Anda";
      case "AMBIL_DI_KANTOR":
        return "diambil langsung di Kantor PPID kami";
      default:
        return "diambil sesuai kesepakatan dengan admin";
    }
  };


  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  if (data === "DITOLAK") {
    return (
      <div className="lg:mt-0 mt-10 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center shadow-sm">
        <FaTimesCircle className="text-red-600 text-4xl mx-auto mb-3" />
        <h2 className="text-lg font-bold text-red-700 uppercase">
          Permohonan Ditolak
        </h2>

        <div className="mt-4 p-4 bg-white rounded-xl border border-red-100 text-left">
          <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">
            Alasan Penolakan:
          </span>
          <p className="text-sm text-gray-700 italic leading-relaxed">
            {catatan
              ? `"${catatan}"`
              : "Tidak ada catatan alasan spesifik dari admin."}
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-lg transition duration-300 mt-6 w-full"
        >
          <FaWhatsapp size={20} />
          <span className="text-xs font-medium">
            Chat via WhatsApp untuk Informasi Lebih Lanjut
          </span>
        </a>
      </div>
    );
  }
  

  const getInitialStep = () => {
    if (!data) return 1;
    if (data === "DIPROSES") return 2;
    if (data === "SELESAI") return 3;
    return 1;
  };

  return (
    <div className="lg:mt-0 mt-10">
      {data === "SELESAI" ? (
        <div className="text-center flex flex-col items-center">
          {/* Visual Checklist jika Selesai */}
          {data === "SELESAI" ? (
            <FaCheckCircle className="text-green-500 text-3xl mb-2" />
          ) : null}

          <h2
            className={`text-lg font-semibold ${data === "SELESAI" ? "text-green-700" : "text-[#9E1C1C]"}`}
          >
            Selesai Diproses
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Permohonan Anda telah selesai diproses.
          </p>

          {/* Tampilkan Cara Memperoleh hanya jika Selesai */}
          {data === "SELESAI" && (
            <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-xs text-green-800 font-medium">
                Informasi yang Anda minta akan{" "}
                <span className="font-bold underline">
                  {mapCaraMemperoleh(rawCaraMemperoleh)}
                </span>
                
              </p>
              {catatan && (
                <p className="text-[11px] text-green-700 mt-2 italic">
                  Catatan: {catatan}
                </p>
              )}

              {fulldata.buktiTerima && (
                <div className="mt-6">
                
                  <a href={fulldata.buktiTerima} target="_blank" rel="noopener noreferrer" className="text-white text-xs bg-red-700 hover:bg-red-600 transition px-5 py-2 rounded-lg font-bold ">
                    Lihat Bukti Terima
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Stepper
          initialStep={getInitialStep()}
          disableStepIndicators
          backButtonProps={{ style: { display: "none" } }}
          nextButtonProps={{ style: { display: "none" } }}
        >
          <Step>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-[#9E1C1C]">
                Status Pengajuan Belum Diproses
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Permohonan Anda telah diterima dan menunggu verifikasi admin.
              </p>
            </div>
          </Step>

          <Step>
            <div className="text-center px-4">
              <h2 className="text-lg font-semibold text-[#9E1C1C]">
                Sedang Diproses
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Permohonan Anda sedang dalam tahap peninjauan oleh Admin PPID
                Kami.
              </p>

              {catatan && (
                <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded text-left flex gap-3 items-start">
                  <FaInfoCircle className="text-amber-500 mt-1 shrink-0" />
                  <div>
                    <span className="text-[9px] font-bold text-amber-600 uppercase">
                      Catatan Admin:
                    </span>
                    <p className="text-xs text-amber-800">{catatan}</p>
                  </div>
                </div>
              )}
            </div>
          </Step>

          <Step>
            <div className="text-center flex flex-col items-center">
              {/* Visual Checklist jika Selesai */}
              {data === "SELESAI" ? (
                <FaCheckCircle className="text-green-500 text-3xl mb-2" />
              ) : null}

              <h2
                className={`text-lg font-semibold ${data === "SELESAI" ? "text-green-700" : "text-[#9E1C1C]"}`}
              >
                Selesai Diproses
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Permohonan Anda telah selesai diproses.
              </p>

              {/* Tampilkan Cara Memperoleh hanya jika Selesai */}
              {data === "SELESAI" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-xs text-green-800 font-medium">
                    Informasi yang Anda minta akan{" "}
                    <span className="font-bold underline">
                      {mapCaraMemperoleh(rawCaraMemperoleh)}
                    </span>
                    .
                  </p>
                  {catatan && (
                    <p className="text-[11px] text-green-700 mt-2 italic">
                      Catatan: {catatan}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Step>
        </Stepper>
      )}
    </div>
  );
};

export default Stepers;
