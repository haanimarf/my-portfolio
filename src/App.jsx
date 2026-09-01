import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certificates from "./components/Certificates.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminProfile from "./admin/AdminProfile.jsx";
import AdminCertificates from "./admin/AdminCertificates.jsx";
import AdminProjects from "./admin/AdminProjects.jsx";
import AdminSkills from "./admin/AdminSkills.jsx";
import AdminContact from "./admin/AdminContact.jsx";

import "./App.css";

function Portfolio() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/profile" element={<AdminProfile />}/>

        <Route path="/admin/certificates" element={<AdminCertificates />}/>

        <Route path="/admin/projects"element={<AdminProjects />}/>

        <Route path="/admin/skills" element={<AdminSkills />}/>

        <Route path="/admin/contact" element={<AdminContact />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;