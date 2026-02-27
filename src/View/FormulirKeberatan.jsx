import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import Navigation from "../components/Navigation";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import ModalButuhBantuan from "../components/ModalButuhBantuan";

const FormulirKeberatan = () => {
  const [agree, setAgree] = useState(false);
  const [saveIdentity, setSaveIdentity] = useState(false);
    const [modalHelpOpen, setModalHelpOpen] = useState(false);
  const formRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form);

    const email = formData.get("email");

    // 🔴 1. Cek field kosong dulu
    const requiredFields = form.querySelectorAll("[required]");
    for (let field of requiredFields) {
      if (!field.value) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        field.focus();
        toast.error("Mohon lengkapi semua field yang wajib diisi.");
        return;
      }
    }

    // 🔴 2. Validasi format email manual
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      const emailInput = form.querySelector("input[name='email']");
      emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
      emailInput.focus();
      toast.error("Format email tidak valid.");
      return;
    }

    // 🔴 3. Cek checkbox pernyataan
    if (!agree) {
      const checkbox = document.getElementById("pernyataan");
      checkbox.scrollIntoView({ behavior: "smooth", block: "center" });
      checkbox.focus();
      toast.error("Silakan centang pernyataan terlebih dahulu.");
      return;
    }

    toast.success("Form berhasil dikirim 🚀");
  };

  return (
    <>
      <Helmet>
        <title>E-PPID Kabupaten Sekadau - Formulir Keberatan</title>
        <meta
          name="description"
          content="Formulir pengajuan keberatan informasi publik Kabupaten Sekadau."
        />
      </Helmet>

      <Container>
        <Navigation navigate={() => {}} text={"Formulir Pengajuan Keberatan"} />

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
                  <input type="radio" name="jenisPemohon" required /> Perorangan
                </label>
                <label>
                  <input type="radio" name="jenisPemohon" /> Kelompok Orang
                </label>
                <label>
                  <input type="radio" name="jenisPemohon" /> Badan Hukum
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
                  <input type="radio" name="identitas" required /> KTP
                </label>
                <label>
                  <input type="radio" name="identitas" /> SIM
                </label>
                <label>
                  <input type="radio" name="identitas" /> Paspor
                </label>
                <label>
                  <input type="radio" name="identitas" /> Surat Kuasa
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
              placeholder="Rincian Informasi Yang Dibutuhkan"
              className="input mb-4"
              rows="3"
              required
            />

            <textarea
              placeholder="Tujuan Penggunaan Informasi"
              className="input mb-6"
              rows="3"
              required
            />

            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Upload Dokumen Pelengkap Permohonan{" "}
                <span className="text-red-500">(opsional)</span>
              </label>
              <input type="file" />
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
              <div onClick={() => setModalHelpOpen(true)} className="text-center mt-4 text-xs hover:underline font-semibold cursor-pointer">
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

export default FormulirKeberatan;
