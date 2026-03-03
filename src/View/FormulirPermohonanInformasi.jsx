import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import Navigation from "../components/Navigation";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import ModalButuhBantuan from "../components/ModalButuhBantuan";
import { PostForm } from "../Service/Api/Form.api";
import { PostToDrive } from "../Service/Api/GoogleDrive.api";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const FormulirPermohonanInformasi = () => {
  const [agree, setAgree] = useState(false);
  const [saveIdentity, setSaveIdentity] = useState(false);
  const [modalHelpOpen, setModalHelpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    const savedData = localStorage.getItem("formIdentity");

    if (savedData && formRef.current) {
      const data = JSON.parse(savedData);
      const form = formRef.current;

      Object.keys(data).forEach((key) => {
        if (form.elements[key]) {
          form.elements[key].value = data[key];
        }
      });

      setSaveIdentity(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form);
    setLoading(true);

    try {
      const email = formData.get("email");

      // 🔴 VALIDASI REQUIRED
      const requiredFields = form.querySelectorAll("[required]");
      for (let field of requiredFields) {
        if (!field.value) {
          field.scrollIntoView({ behavior: "smooth", block: "center" });
          field.focus();
          toast.error("Mohon lengkapi semua field yang wajib diisi.");
          return;
        }
      }
      // 🔥 VALIDASI RADIO JENIS PEMOHON
      if (!formData.get("jenisPemohon")) {
        toast.error("Pilih jenis pemohon terlebih dahulu.");
        return;
      }

      // 🔥 VALIDASI RADIO IDENTITAS
      if (!formData.get("identitas")) {
        toast.error("Pilih jenis identitas terlebih dahulu.");
        return;
      }

      // 🔴 VALIDASI EMAIL
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Format email tidak valid.");
        return;
      }

      if (!agree) {
        toast.error("Silakan centang pernyataan terlebih dahulu.");
        return;
      }

      let dokumenUrl = null;
      let dokumenName = null;

      const file = formData.get("dokumen");

      if (file && file.size > 0) {
        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
          toast.error("Ukuran file maksimal 5MB.");
          return;
        }

        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
          toast.error("Format file harus PDF, JPG, atau PNG.");
          return;
        }

        const reader = new FileReader();

        const base64File = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // 🔥 Upload ke Google Drive dari frontend
        const uploadResponse = await PostToDrive({
          fileName: file.name,
          fileData: base64File,
        });

        if (uploadResponse.status !== "success") {
          toast.error("Upload file gagal.");
          return;
        }

        dokumenUrl = uploadResponse.fileUrl;
        dokumenName = file.name;
      }

      // 🔥 Simpan identitas (optional)
      if (saveIdentity) {
        const identityData = {
          nama: formData.get("nama"),
          email: formData.get("email"),
          telepon: formData.get("telepon"),
          pendidikan: formData.get("pendidikan"),
          pekerjaan: formData.get("pekerjaan"),
          alamat: formData.get("alamat"),
        };
        localStorage.setItem("formIdentity", JSON.stringify(identityData));
      } else {
        localStorage.removeItem("formIdentity");
      }

      // 🔥 Payload ke backend
      const payload = {
        type: "PERMINTAAN_INFORMASI",
        jenisPemohon: formData.get("jenisPemohon"),
        nama: formData.get("nama"),
        email: formData.get("email"),
        telepon: formData.get("telepon"),
        pendidikan: formData.get("pendidikan"),
        pekerjaan: formData.get("pekerjaan"),
        alamat: formData.get("alamat"),
        jenisIdentitas: formData.get("identitas"),
        nomorIdentitas: formData.get("nomorIdentitas"),
        rincianInformasi: formData.get("rincianInformasi"),
        tujuanPenggunaan: formData.get("tujuanPenggunaan"),
        dokumenUrl,
        deviceId: localStorage.getItem("device_data")
          ? JSON.parse(localStorage.getItem("device_data")).deviceId
          : null,
        dokumenName,
        agree,
      };

      const response = await PostForm(payload);

      toast.success(
        `Form berhasil dikirim 🚀\nNomor Tiket: ${response.data.ticketNumber}`,
      );

      navigate(`/status/ticket?id=${response.data.ticketNumber}`);

      form.reset();
      setAgree(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengirim form. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (file.size > maxSize) {
      toast.error("Ukuran file maksimal 5MB.");
      e.target.value = ""; // reset file input
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus PDF, JPG, atau PNG.");
      e.target.value = "";
      return;
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>E-PPID Kabupaten Sekadau - Formulir Permohonan Informasi</title>
        <meta
          name="description"
          content="Formulir pengajuan permohonan informasi publik Kabupaten Sekadau."
        />
      </Helmet>

      <Container>
        <Navigation
          navigate={() => {}}
          text={"Formulir Pengajuan Permohonan Informasi"}
        />

        <section className="bg-gray-100 lg:py-12">
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            noValidate
            className="max-w-5xl mx-auto bg-white shadow-md p-8 rounded"
          >
            <h2 className="text-center uppercase font-bold border-b-4 border-black text-lg mb-8">
              Isi Data Dengan Lengkap dan Jelas
            </h2>

            {/* Jenis Pemohon */}
            <div className="mb-6">
              <label className="font-semibold block mb-2">Jenis Pemohon</label>
              <div className="flex lg:flex-row flex-col gap-6 lg:items-center text-sm">
                <label>
                  <input
                    type="radio"
                    name="jenisPemohon"
                    value="PERORANGAN"
                    required
                  />
                  Perorangan
                </label>

                <label>
                  <input
                    type="radio"
                    name="jenisPemohon"
                    value="KELOMPOK_ORANG"
                  />
                  Kelompok Orang
                </label>

                <label>
                  <input type="radio" name="jenisPemohon" value="BADAN_HUKUM" />
                  Badan Hukum
                </label>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="nama"
                placeholder="Nama Pemohon Sesuai KTP"
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                required
              />
              <input
                type="text"
                name="telepon"
                placeholder="No. Telepon / HP"
                className="input"
                required
              />
              <input
                type="text"
                name="pendidikan"
                placeholder="Pendidikan"
                className="input"
                required
              />
              <input
                type="text"
                name="pekerjaan"
                placeholder="Pekerjaan"
                className="input"
                required
              />
            </div>

            <textarea
              name="alamat"
              placeholder="Alamat Pemohon"
              className="input mb-6"
              rows="2"
              required
            />

            {/* Jenis Identitas */}
            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Jenis Identitas
              </label>

              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <label>
                  <input type="radio" name="identitas" value="KTP" required />
                  KTP
                </label>

                <label className="">
                  <input
                    type="radio"
                    className=""
                    name="identitas"
                    value="SIM"
                  />
                  SIM
                </label>

                <label>
                  <input type="radio" name="identitas" value="PASPOR" />
                  Paspor
                </label>

                <label>
                  <input type="radio" name="identitas" value="SURAT_KUASA" />
                  Surat Kuasa
                </label>
              </div>

              <input
                type="text"
                name="nomorIdentitas"
                placeholder="Nomor Identitas"
                className="input mt-3"
                required
              />
            </div>
            <textarea
              name="rincianInformasi"
              className="input mb-4"
              placeholder="Rincian Informasi yang Diberatkan"
              rows="3"
              required
            />

            <textarea
              name="tujuanPenggunaan"
              className="input mb-6"
              placeholder="Tujuan Penggunaan"
              rows="3"
              required
            />

            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Upload Dokumen Pelengkap Permohonan{" "}
                <span className="text-red-500">(opsional)</span>
              </label>
              <p className="mb-4 text-xs font-bold">
                Format: PDF, JPG, JPEG, PNG | Maksimal: 5MB
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                name="dokumen"
                onChange={handleFileChange}
              />
            </div>

            {/* Simpan Identitas */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="saveIdentity"
                checked={saveIdentity}
                onChange={(e) => setSaveIdentity(e.target.checked)}
              />
              <label htmlFor="saveIdentity">Simpan identitas</label>
            </div>

            {/* Pernyataan */}
            <div className="mb-6 flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="pernyataan"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="pernyataan">
                Saya menyatakan bahwa data dan informasi yang saya isi adalah
                benar dan dapat dipertanggung jawabkan.
              </label>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-900 text-white py-2 font-bold rounded transition"
              >
                Simpan
              </button>
              <div
                onClick={() => setModalHelpOpen(true)}
                className="text-center mt-4 text-xs hover:underline font-semibold cursor-pointer"
              >
                Butuh bantuan?
              </div>
            </div>
          </form>

          <style>
            {`
              .input {
                width: 100%;
                border: 1px solid #d1d5db;
                padding: 10px;
                border-radius: 4px;
                font-size: 14px;
              }
              .input:focus {
                outline: none;
                border-color: #991b1b;
                box-shadow: 0 0 0 1px #991b1b;
              }
            `}
          </style>
        </section>
      </Container>
      <AnimatePresence>
        {modalHelpOpen && (
          <ModalButuhBantuan
            key="modal-help"
            onClose={() => setModalHelpOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FormulirPermohonanInformasi;
