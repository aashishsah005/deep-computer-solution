import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { WhatsAppFAB } from "./components/WhatsAppButton";
import SketchLoader from "./components/SketchLoader";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import RepairServices from "./pages/RepairServices";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminRepairs from "./pages/admin/AdminRepairs";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show sketch animation while the website initially loads, then smoothly fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 1100);
    const removeTimer = setTimeout(() => setShowSplash(false), 1600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-base transition-opacity duration-500 ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <SketchLoader size="lg" text="Deep Computer And Solution" subtext="Biratnagar, Nepal" />
        </div>
      )}
      <Routes>
      {/* Admin routes: own layout, no public navbar/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="repairs" element={<AdminRepairs />} />
      </Route>

      {/* Public site */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/repair" element={<RepairServices />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
            <WhatsAppFAB />
          </div>
        }
      />
    </Routes>
    </>
  );
}
