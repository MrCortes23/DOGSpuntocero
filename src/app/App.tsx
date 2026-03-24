import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SideMenu } from "./components/SideMenu";
import { MobileMenu } from "./components/MobileMenu";
import { HeroSection } from "./components/HeroSection";
import { RazasSection } from "./components/RazasSection";
import { CuidadosSection } from "./components/CuidadosSection";
import { AlimentacionSection } from "./components/AlimentacionSection";
import { ContactoSection } from "./components/ContactoSection";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "razas", "cuidados", "alimentacion", "contacto"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Floating Global Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-8 lg:top-10 right-6 sm:right-10 lg:right-16 z-[100] flex items-center gap-3 pointer-events-none"
      >
        <div className="flex flex-col pointer-events-auto">
          <span className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight leading-none drop-shadow-md">
            DOGS<span className="font-light text-gray-500">puntocero</span>
          </span>
        </div>
      </motion.div>

      {/* Menú lateral para desktop */}
      <SideMenu
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Menú móvil */}
      <MobileMenu
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Contenido principal con margen para el menú */}
      <main className="lg:ml-[70px] transition-all duration-300">
        {/* Secciones */}
        <div id="home">
          <HeroSection />
        </div>

        <div id="razas">
          <RazasSection />
        </div>

        <div id="cuidados">
          <CuidadosSection />
        </div>

        <div id="alimentacion">
          <AlimentacionSection />
        </div>

        <div id="contacto">
          <ContactoSection />
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-100">
          <p>© 2026 Mundo Canino. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}