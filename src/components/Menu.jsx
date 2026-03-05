import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Megaphone, ClipboardList, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Joyride from "react-joyride";
import Animated from "./Animated";

const menuItems = [
  {
    title: "Formulir Permohonan Informasi",
    icon: <FileText size={28} />,
    link: "/formulir-informasi",
  },
  {
    title: "Formulir Pengajuan Keberatan",
    icon: <Megaphone size={28} />,
    link: "/formulir-keberatan",
  },
  {
    title: "Cek Status Permohonan",
    icon: <ClipboardList size={28} />,
    link: "/ticket",
  },
  {
    title: "Daftar Informasi Publik Online",
    icon: <Search size={28} />,
    link: "/#",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Menu = () => {
  const navigate = useNavigate();
  const [runGuide, setRunGuide] = useState(false);

  useEffect(() => {
    const deviceData = localStorage.getItem("device_data");

    if (!deviceData) return;

    const { deviceId } = JSON.parse(deviceData);

    const savedGuide = localStorage.getItem("deviceGuide");

    // jika device belum pernah lihat guide
    if (savedGuide !== deviceId) {
      setRunGuide(true);
      localStorage.setItem("deviceGuide", deviceId);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      localStorage.setItem("guideDone", "true");
      setRunGuide(false);
      scrollTo(0, 0); 
    }
  };
  const steps = [
    {
      target: ".menu-0",
      content: "Klik di sini untuk membuat permohonan informasi publik.",
      disableBeacon: true,
    },
    {
      target: ".menu-1",
      content: "Gunakan menu ini jika ingin mengajukan keberatan.",
    },
    {
      target: ".menu-2",
      content: "Di sini kamu bisa cek status permohonan kamu.",
    },
    {
      target: ".menu-3",
      content: "Menu ini berisi daftar informasi publik yang tersedia.",
    },
  ];

  return (
    <>
      <Joyride
        steps={steps}
        run={runGuide}
        continuous
        showSkipButton
        scrollToFirstStep
        spotlightPadding={10}
        scrollOffset={100}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#b91c1c",
            zIndex: 9999,
          },
        }}
        floaterProps={{
          offset: 80,
        }}
      />

      <Animated direction={"vertical"} distance={30}>
        <div className="flex items-center justify-center py-10">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:px-0 px-2 lg:max-w-5xl">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(item.link)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`menu-${index} group relative overflow-hidden flex items-center gap-3 px-8 py-5 rounded-full 
                bg-gradient-to-r from-red-700 to-red-950 
                text-white font-semibold text-sm
                shadow-lg cursor-pointer transition-all duration-300`}
              >
                {/* LEFT BORDER */}
                <span className="absolute inset-0 rounded-full pointer-events-none">
                  <span
                    className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-orange-400
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-500 ease-out"
                  />
                </span>

                {/* RIGHT BORDER */}
                <span className="absolute inset-0 rounded-full pointer-events-none">
                  <span
                    className="absolute right-0 top-0 h-full w-full rounded-full border-4 border-orange-400
                    scale-x-0 origin-right
                    group-hover:scale-x-100
                    transition-transform duration-500 ease-out delay-75"
                  />
                </span>

                {/* Shine */}
                <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <span
                    className="absolute -left-1/2 top-0 h-full w-1/2 
                    bg-gradient-to-r from-transparent via-white/40 to-transparent
                    skew-x-[-20deg]
                    translate-x-[-150%]
                    group-hover:translate-x-[300%]
                    transition-transform duration-700 ease-out"
                  />
                </span>

                <div className="relative z-10 flex items-center gap-3">
                  <div>{item.icon}</div>
                  <span>{item.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Animated>
    </>
  );
};

export default Menu;
