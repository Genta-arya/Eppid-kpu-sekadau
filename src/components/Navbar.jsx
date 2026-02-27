import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Animated from "./Animated";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="pb-8 fixed  w-full z-40">
      <Animated direction={"vertical"} distance={0} reverse={true} scale={0}>
        <nav className="bg-gradient-to-r border-b-4 border-orange-400 from-[#2f0000] via-[#9e0f0f] to-[#2f0000] text-white shadow-md fixed w-full z-40">
          <div className=" lg:px-14 md:px-10 py-3 flex justify-between items-center">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center hover:text-yellow-500 cursor-pointer transition-all duration-500   gap-1"
            >
              <img
                src="https://sekadaukabppid.kpu.go.id/img/logo.png"
                alt="Logo"
                className="lg:h-20 h-14 px-2"
              />
              <div className="flex flex-col gap-0">
                <h1 className="text-xl font-bold tracking-wide">E-PPID</h1>
                <p className="font-semibold -mt-1 uppercase">
                  Kabupaten Sekadau
                </p>
                <p className="text-[10px] font-semibold italic">
                  Beta Versi 1.0
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 font-medium relative">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-1 pb-1 transition ${
                    isActive
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "hover:text-gray-300"
                  }`
                }
              >
                Beranda
              </NavLink>
              <li
                ref={dropdownRef}
                className="relative cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              >
                <div className="flex items-center gap-1 hover:text-gray-300">
                  Profil <FiChevronDown size={16} />
                </div>

                {dropdown && (
                  <div className="absolute text-sm top-10 right-0 bg-white text-gray-700 w-56 shadow-lg rounded-md py-2 border-l-4 border-yellow-500">
                    <Link
                      target="_blank"
                      to="https://sekadaukabppid.kpu.go.id/visi_misi"
                      className="px-4 py-2 block  hover:bg-gray-100 cursor-pointer"
                    >
                      Visi dan Misi
                    </Link>
                    <Link
                      target="_blank"
                      to="https://sekadaukabppid.kpu.go.id/profil_ppid"
                      className="px-4 py-2 block  hover:bg-gray-100 cursor-pointer"
                    >
                      Profil Singkat PPID
                    </Link>
                    <Link
                      target="_blank"
                      to="https://sekadaukabppid.kpu.go.id/tugas_ppid"
                      className="px-4 py-2 block  hover:bg-gray-100 cursor-pointer"
                    >
                      Tugas dan Fungsi PPID
                    </Link>
                    <Link
                      to={"https://sekadaukabppid.kpu.go.id/struktur_ppid"}
                      target="_blank"
                      className="px-4 py-2 block  hover:bg-gray-100 cursor-pointer"
                    >
                      Struktur PPID
                    </Link>
                  </div>
                )}
              </li>

              <Link
                to={"https://sekadaukabppid.kpu.go.id/regulasi"}
                target="_blank"
                className="hover:text-gray-300 cursor-pointer"
              >
                Regulasi
              </Link>
              <li className="hover:text-gray-300 cursor-pointer">Cek Status</li>
            </ul>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden mr-4 flex flex-col justify-center items-center w-8 h-8 relative"
            >
              {/* Top Line */}
              <span
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "rotate-45 top-4" : "top-2"
                }`}
              />

              {/* Middle Line */}
              <span
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "opacity-0" : "top-4"
                }`}
              />

              {/* Bottom Line */}
              <span
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  open ? "-rotate-45 top-4" : "top-6"
                }`}
              />
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ originY: 0 }}
                className="md:hidden bg-gradient-to-r from-[#2f0000] via-[#9e0f0f] to-[#2f0000]"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                  className="px-6 pb-6 pt-4 space-y-4"
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-1 pb-1 transition ${
                        isActive
                          ? "text-yellow-500  border-yellow-500"
                          : "hover:text-gray-300"
                      }`
                    }
                  >
                    Beranda
                  </NavLink>
                  {/* PROFIL */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <div
                      onClick={() => setMobileDropdown(!mobileDropdown)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>Profil</span>

                      <motion.div
                        animate={{ rotate: mobileDropdown ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiChevronDown size={16} />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {mobileDropdown && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-2 ml-8 space-y-2 text-sm list-disc"
                        >
                          {[
                            {
                              to: "https://sekadaukabppid.kpu.go.id/visi_misi",
                              label: "Visi dan Misi",
                            },
                            {
                              to: "https://sekadaukabppid.kpu.go.id/profil_ppid",
                              label: "Profil Singkat PPID",
                            },
                            {
                              to: "https://sekadaukabppid.kpu.go.id/tugas_ppid",
                              label: "Tugas dan Fungsi PPID",
                            },
                            {
                              to: "https://sekadaukabppid.kpu.go.id/struktur_ppid",
                              label: "Struktur PPID",
                            },
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Link
                                to={item.to}
                                target="_blank"
                                className="hover:text-gray-300 cursor-pointer"
                                onClick={() => setOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* REGULASI */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    Regulasi
                  </motion.div>

                  {/* CEK STATUS */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    Cek Status
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </Animated>
    </div>
  );
};

export default Navbar;
