import React, { useState } from "react";
import Admin from "../components/Admin";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import Footer from "../components/Footer";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar />
      <UnifiedSidebar/>
      <ScrollToTop />
      <Admin />
      <Footer />
    </>
  );
}

export default AdminPage;
