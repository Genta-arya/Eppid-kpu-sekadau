import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderX, FileText, Calendar, Mail, User, Download, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import Container from "./Container";
import Stepers from "./Steper";
import { CekStatus } from "../Service/Api/Form.api";
import { Api_Base_URL } from "../Constants/Constants";

const CekStatusPengajuan = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const [ticketId, setTicketId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState(null);

  const cekStatus = async (id) => {
    if (!id.trim()) return;
    try {
      setLoading(true);
      setNotFound(false);
      const response = await CekStatus(id);
      setFormData(response.data);
      setSubmitted(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setNotFound(true);
        setSubmitted(true);
      } else {
        toast.error("Gagal mengambil data. Silakan periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cekStatus(ticketId);
  };

  useEffect(() => {
    if (initialId) cekStatus(initialId);
  }, [initialId]);

  return (
    <Container>
      <div className="min-h-screen bg-slate-50/50 py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* SEARCH CARD */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            <div className="bg-[#9E1C1C] p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Cek Proses Permohonan</h1>
              <p className="text-red-100 text-sm mt-1 opacity-80 font-medium">Masukkan nomor registrasi untuk melihat progres data Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#9E1C1C] transition-colors" size={20} />
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Contoh: INF-20260403-0001"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-[#9E1C1C] focus:outline-none transition-all font-semibold text-slate-700"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#9E1C1C] hover:bg-red-800 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "PERIKSA STATUS SEKARANG"}
              </button>
            </form>
          </motion.div>

          {/* RESULT SECTION */}
          <AnimatePresence mode="wait">
            {submitted && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {notFound ? (
                  <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FolderX size={40} className="text-[#9E1C1C]" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Data Tidak Ditemukan</h2>
                    <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm leading-relaxed">
                      Nomor registrasi <span className="font-bold text-red-700">{ticketId}</span> tidak terdaftar di sistem kami.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* INFO GRID */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-slate-50 gap-4">
                        <div className="text-center md:text-left">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Tiket Resmi</span>
                          <h3 className="text-2xl font-black text-[#9E1C1C] leading-none mt-1">{formData?.ticketNumber}</h3>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${formData?.status === 'SELESAI' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          Status: {formData?.status}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <InfoItem icon={<User size={16}/>} label="Nama Pemohon" value={formData?.nama} />
                        <InfoItem icon={<FileText size={16}/>} label="Jenis Pengajuan" value={formData?.type === "KEBERATAN" ? "Pengajuan Keberatan" : "Permohonan Informasi"} />
                        <InfoItem icon={<Mail size={16}/>} label="Email Terdaftar" value={formData?.email} />
                        <InfoItem icon={<Calendar size={16}/>} label="Tanggal Masuk" value={new Date(formData?.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })} />
                      </div>

                      {formData?.dokumenUrl && (
                        <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden group">
                           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-600 rounded-xl">
                                  <Download size={20} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-red-400 uppercase tracking-tighter">Dokumen Terlampir</p>
                                  <p className="text-sm font-medium text-slate-300">File Pelengkap Permohonan</p>
                                </div>
                              </div>
                              <a
                                href={`${Api_Base_URL}/form/file/download?id=${formData.ticketNumber}`}
                                target="_blank" rel="noopener noreferrer"
                                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                              >
                                UNDUH DOKUMEN <ArrowRight size={14} />
                              </a>
                           </div>
                           <FileText className="absolute right-0 bottom-0 text-white/5 -mb-4 -mr-4" size={100} />
                        </div>
                      )}

                      {formData?.catatanAdmin && formData?.status !== "DITOLAK" && (
                        <div className="mt-6 flex gap-4 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                          <AlertCircle className="text-orange-600 shrink-0" size={20} />
                          <div>
                            <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-1">Catatan dari Admin</p>
                            <p className="text-sm text-orange-900/80 leading-relaxed font-medium">{formData?.catatanAdmin}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PROGRESS CARD */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-10 text-center">Timeline Progress Pengajuan</h3>
                      <Stepers fulldata={formData} data={formData?.status} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
};

// HELPER COMPONENT
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-2">
    <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:text-[#9E1C1C] transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-sm font-bold text-slate-700 leading-tight">{value || "-"}</p>
    </div>
  </div>
);

export default CekStatusPengajuan;