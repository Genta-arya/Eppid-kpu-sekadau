import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import doneLottie from "../assets/Done.json";
import Container from "./Container";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const SubmitComplete = () => {
  const lottieRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const ticketId = searchParams.get("id");

  useEffect(() => {
    const timer = setTimeout(() => {
      lottieRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    if (!ticketId) return;
    await navigator.clipboard.writeText(ticketId);
    toast.success("Nomor tiket berhasil disalin!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckStatus = () => {
    navigate(`/ticket?id=${ticketId}`);
  };

  return (
    <Container>
      <div className="pb-24">
        <div
          ref={lottieRef}
          className="scroll-mt-24 mt-20 flex flex-col items-center justify-center"
        >
          <div className="w-56">
            <Lottie animationData={doneLottie} loop />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">
            Pengajuan Berhasil 🎉
          </h2>

          <p className="mt-2 text-gray-500 text-center max-w-sm">
            Data kamu sudah berhasil dikirim.
          </p>

          <div className="mt-6 bg-red-50 border border-red-200 px-6 py-5 rounded-xl text-center shadow-sm">
            <p className="text-xs text-red-700 tracking-wide">
              NOMOR REGISTRASI
            </p>

            <p className="text-lg font-bold text-[#900D0D] mt-1 tracking-wider">
              {ticketId}
            </p>

            <button
              onClick={handleCopy}
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#900D0D] hover:opacity-80 transition"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Berhasil Disalin
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Salin Nomor
                </>
              )}
            </button>
          </div>

          {/* Button Cek Status */}
          <button
            onClick={handleCheckStatus}
            className="mt-6 bg-[#900D0D] hover:bg-red-800 text-white px-6 py-2.5 rounded-lg transition-all flex items-center gap-2"
          >
            Cek Status Pengajuan
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="mt-3 hover:underline text-black px-6 py-2.5 rounded-lg transition-all flex items-center gap-2"
          >
            Kembali
          
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SubmitComplete;
