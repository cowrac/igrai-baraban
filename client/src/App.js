import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BuyCertificateModal from "./components/BuyCertificateModal";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function HomePage() {
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
