import React, { useState, useEffect } from "react";
import Container from "./Container";
import { useSearchParams } from "react-router-dom";
import { Search, FolderX } from "lucide-react";
import Stepers from "./Steper";
import { toast } from "sonner";
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
        toast.error("Terjadi kesalahan saat mengambil data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketId.trim()) return;
    await cekStatus(ticketId);
  };

  // 🔥 Auto fetch kalau masuk dari email (?id=)
  useEffect(() => {
    if (initialId) {
      cekStatus(initialId);
    }
  }, []); // eslint-disable-line

  return (
    <Container>
      <div className="min-h-[70vh] flex items-center justify-center py-24 px-4">
        <div className="w-full lg:max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#9E1C1C] text-white p-6 text-center">
            <h1 className="text-xl font-semibold">Cek Status Pengajuan PPID</h1>
          </div>

          <div className="p-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  Nomor Registrasi
                </label>
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Contoh: INF-20250303-0001"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9E1C1C] focus:border-[#9E1C1C] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#9E1C1C] hover:bg-red-800 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memuat...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Cek Status
                  </>
                )}
              </button>
            </form>

            {/* RESULT SECTION */}
            {submitted && !loading && (
              <>
                {notFound ? (
                  <div className="mt-12 flex flex-col items-center text-center py-12">
                    <FolderX size={64} className="text-[#9E1C1C] mb-4" />
                    <h2 className="text-lg font-semibold text-gray-800">
                      Nomor Registrasi Tidak Terdaftar
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Pastikan nomor registrasi yang Anda masukkan sudah benar.
                    </p>
                  </div>
                ) : (
                  <div className="mt-10 space-y-8">
                    {/* DETAIL CARD */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="text-center mb-6">
                        <p className="text-sm text-gray-500">
                          Nomor Registrasi
                        </p>
                        <p className="text-lg font-bold text-[#9E1C1C]">
                          {formData?.ticketNumber}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="text-gray-500">Nama Pemohon</p>
                          <p className="font-medium text-gray-800">
                            {formData?.nama}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Jenis Permohonan</p>
                          <p className="font-medium text-gray-800">
                            {formData?.type === "KEBERATAN"
                              ? "Pengajuan Permohonan Keberatan"
                              : "Permohonan Informasi"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">
                            {formData?.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Tanggal Pengajuan</p>
                          <p className="font-medium text-gray-800">
                            {new Date(formData?.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      {formData?.dokumenUrl && (
                        <div className="mt-6">
                          <p className="mb-2 font-bold text-sm text-center mt-8">Dokumen Pelengkap Permohonan</p>
                          <a
                            href={`${Api_Base_URL}/form/file/download?id=${formData.ticketNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center bg-[#9E1C1C] text-white px-5 py-3 rounded-lg hover:bg-red-800 transition font-bold"
                          >
                            Download
                          </a>
                        </div>
                      )}

                      {/* Catatan Admin */}
                      {formData?.catatanAdmin && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm font-semibold text-[#9E1C1C]">
                            Catatan Admin
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            {formData?.catatanAdmin}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* STEPPER STATUS */}
                    <Stepers fulldata={formData} data={formData?.status} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CekStatusPengajuan;
