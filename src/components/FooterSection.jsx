import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { BsTiktok } from "react-icons/bs";
import { GetAnalytic } from "../Service/Api/Analytic.api";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const FooterSection = () => {
  const [analyticData, setAnalyticData] = useState({
    totalTicket: 0,
    totalAnalytic: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytic = async () => {
    setLoading(true);
    try {
      const response = await GetAnalytic();
      if (response.data) {
        setAnalyticData({
          totalTicket: response.data.totalTicket || 0,
          totalAnalytic: response.data.totalAnalytic || 0,
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data analitik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytic();
  }, []);

  return (
    <footer className="relative w-full bg-[#0f172a] text-white overflow-hidden">
      {/* Ornamen Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:px-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* KOLOM 1: KONTAK & ALAMAT */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-red-600 pl-4 mb-6">
                Kontak Kami
              </h2>
              <div className="space-y-4 text-gray-300">
                <a
                  href="https://wa.me/6285173284821"
                  target="_blank"
                  className="flex items-start gap-4 group hover:text-white transition"
                >
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-600 transition">
                    <Phone
                      size={20}
                      className="text-red-500 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                      Whatsapp CS
                    </p>
                    <p className="text-sm font-medium">
                      Pejabat Pengelola Informasi (PPID)
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:kpu.sekadau@gmail.com"
                  className="flex items-center gap-4 group hover:text-white transition"
                >
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-600 transition">
                    <Mail
                      size={20}
                      className="text-red-500 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                      Email Resmi
                    </p>
                    <p className="text-sm font-medium">kpu.sekadau@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <MapPin size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                      Alamat Kantor
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      Jl. Merdeka Timur Km. 9, Komplek Perkantoran Pemda Kab.
                      Sekadau, Kalimantan Barat 78711
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 2: LOKASI GOOGLE MAPS */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-red-600 pl-4 mb-6">
              Lokasi Kantor
            </h2>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <iframe
                title="Map KPU Sekadau"
                className="w-full h-48 md:h-64 grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.204!2d110.9!3d0.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDAnMDAuMCJOIDExMMKwNTQnMDAuMCJF!5e0!3m2!1sid!2sid!4v123456789"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* KOLOM 3: STATISTIK & SOSMED */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-red-600 pl-4 mb-6">
                Statistik & Media
              </h2>

              {/* Statistik Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-inner mb-6">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4">
                  Data Permohonan (Sejak 2015)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">
                      Informasi
                    </p>
                    {loading ? (
                      <Loader2
                        className="animate-spin mx-auto text-orange-500"
                        size={20}
                      />
                    ) : (
                      <span className="text-2xl font-black text-orange-500">
                        <CountUp end={analyticData.totalTicket} duration={3} />
                      </span>
                    )}
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">
                      Keberatan
                    </p>
                    <span className="text-2xl font-black text-orange-500">
                      <CountUp end={0} duration={1} />
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase">
                    Total Kunjungan
                  </p>
                  <span className="text-xs font-mono text-gray-400">
                    {loading ? (
                      "..."
                    ) : (
                      <CountUp end={analyticData.totalAnalytic} separator="." />
                    )}
                  </span>
                </div>
              </div>

              {/* Sosmed Buttons */}
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    Icon: Facebook,
                    url: "https://facebook.com/kpukabupatensekadau",
                  },
                  {
                    Icon: Instagram,
                    url: "https://instagram.com/kpu_kab.sekadau",
                  },
                  { Icon: BsTiktok, url: "https://tiktok.com/@kpusekadau" },
                  { Icon: Twitter, url: "https://x.com/kpuskd" },
                  {
                    Icon: Youtube,
                    url: "https://www.youtube.com/channel/UCv2bBlkAA6YdFAi0BuYX0kA",
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    whileHover={{ y: -5 }}
                    className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors border border-white/10"
                  >
                    <social.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
