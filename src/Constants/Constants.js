export const Image_Logo = "https://sekadaukabppid.kpu.go.id/img/logo.png";

export const Icon = [
  {
    id: 1,
    name: "Berkala",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/1_berkala.png",
  },
  {
    id: 2,
    name: "Tersedia Setiap Saat",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/2_setiap_saat.png",
  },
  {
    id: 3,
    name: "Serta Merta",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/3_serta_merta.png",
  },
  {
    id: 4,
    name: "Dikecualikan",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/4_dikecualikan.png",
  },
  {
    id: 5,
    name: "Permohonan Informasi",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/5_permohonan_informasi.png",
  },
  {
    id: 6,
    name: "Prosedur Pengajuan",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/6_prosedur_pengajuan.png",
  },
  {
    id: 7,
    name: "Prosedur Sengketa",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/7_prosedur_sengketa.png",
  },
  {
    id: 8,
    name: "Panduan EPPID",
    iconLink: "https://sekadaukabppid.kpu.go.id/img/8_panduan_eppid.png",
  },
];

// const type = "production";
const type = "local";

export const Api_Base_URL =
  type === "local"
    ? "http://localhost:8080/api"
    : "https://server-ppid.vercel.app/api";
