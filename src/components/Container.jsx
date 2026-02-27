import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import FloatingScrollToTop from "./FloatingScrollToTop";

const Container = ({ children }) => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="">{children}</div>
      <FloatingScrollToTop />

      <Footer />
    </>
  );
};

export default Container;
