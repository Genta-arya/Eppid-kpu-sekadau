import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import { BsTiktok } from "react-icons/bs";

const FooterSection = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white p-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT - KONTAK */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Kontak</h2>

          <a
            href="https://api.whatsapp.com/send?phone=6285173284821&text=Halo%2C%20saya%20menghubungi%20melalui%20website%20PPID%20Sekadau.%20Nama%20saya%3A"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <p className="text-orange-400 font-semibold mb-2 ">Hubungi Kami:</p>

            <p className=" hover:text-red-500 transition hover:underline cursor-pointer">
              Customer Service Pejabat Pengelola Informasi dan Dokumentasi
              (PPID) KPU Kabupaten Sekadau
            </p>
            <a
              href="mailto:kpu.sekadau@gmail.com"
              className="text-sm text-gray-300 hover:text-red-500 transition  cursor-pointer hover:underline"
            >
              Email: kpu.sekadau@gmail.com
            </a>
          </a>

          <p className="text-orange-400 font-semibold mb-2 mt-4">Alamat:</p>
          <p className="mb-6">
            Jl. Merdeka Timur Km. 9, Komplek Perkantoran Pemerintah Daerah
            Kabupaten Sekadau, Kecamatan Sekadau Hilir, Kabupaten Sekadau,
            Kalimantan Barat 78711
          </p>
        </div>

        {/* MIDDLE - GOOGLE MAPS */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Lokasi Kantor KPU Kabupaten Sekadau
          </h2>

          <div className="rounded-xl overflow-hidden shadow-2xl aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps?q=KPU+Kabupaten+Sekadau&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* RIGHT - SOSMED & STAT */}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-6 md:mt-0 mt-8">Sosial Media</h2>

        <div className="flex gap-4 mb-8">
          <a
            href="https://www.facebook.com/kpukabupatensekadau/?locale=id_ID&_rdc=2&_rdr#"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <Facebook className="text-black" size={20} />
          </a>
          <a
            href="https://www.instagram.com/kpu_kab.sekadau"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <Instagram className="text-black" size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@kpusekadau"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <BsTiktok className="text-black" size={20} />
          </a>
          <a
            href="https://x.com/kpuskd"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <Twitter className="text-black" size={20} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCv2bBlkAA6YdFAi0BuYX0kA"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            <Youtube className="text-black" size={20} />
          </a>
        </div>

        <div className="bg-orange-500 text-white text-xl font-bold text-center py-3 rounded-md mb-4">
          Jumlah Permohonan <br /> (Sejak 2015 - Sekarang)
        </div>

        <div className="text-center space-y-3">
          <p>
            Permintaan Informasi <br />
            <span className="text-3xl font-bold text-orange-400">6</span>
          </p>

          <p>
            Keberatan <br />
            <span className="text-3xl font-bold text-orange-400">0</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
