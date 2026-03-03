import React, { useEffect } from "react";
import ModalMaklumat from "./components/ModalMaklumat";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FloatingWa from "./components/FloatingWa";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ClassifikasiTeknis from "./components/ClassifikasiTeknis";
import ProsedurLayanan from "./components/ProsedurLayanan";
import FloatingScrollToTop from "./components/FloatingScrollToTop";
import { Helmet } from "react-helmet-async";
import VideoPlayer from "./components/VidePlayer";
import FooterSection from "./components/FooterSection";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Helmet>
        <title>E-PPID Kabupaten Sekadau - Beranda</title>
        <meta
          name="description"
          content="E-PPID Kabupaten Sekadau adalah platform informasi publik yang menyediakan layanan pengaduan dan pemberitahuan terkait informasi publik kepemiluan."
        />
      </Helmet>
      <ModalMaklumat />

      <Navbar />

      {/* Main Content */}
      <Header />
      <main className="flex-grow w-full">
        <div className="  pt-10">
          <Menu />
          <div className="my-20">
            <ClassifikasiTeknis />
          </div>
          <div className="my-10">
            <ProsedurLayanan />
          </div>
          <div className="0">
            <VideoPlayer />
          </div>

          <FooterSection />
        </div>
      </main>

      <Footer />

      <FloatingScrollToTop />

      <FloatingWa />
    </div>
  );
};

export default App;
