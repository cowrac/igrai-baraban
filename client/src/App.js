import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BuyCertificateModal from "./components/BuyCertificateModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <Main onBuyClick={() => setShowModal(true)} />
      <About />
      <News />
      <Gallery />
      <Footer />
      {showModal && <BuyCertificateModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default App;
