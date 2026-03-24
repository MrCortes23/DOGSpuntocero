import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  PawPrint,
  Heart,
  UtensilsCrossed,
  Mail,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "razas", label: "Razas", icon: PawPrint },
  { id: "cuidados", label: "Cuidados", icon: Heart },
  { id: "alimentacion", label: "Alimentación", icon: UtensilsCrossed },
  { id: "contacto", label: "Contacto", icon: Mail },
];

export function MobileMenu({
  activeSection,
  onSectionClick,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (id: string) => {
    onSectionClick(id);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Sleek Hamburger Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[120] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <div className="relative w-5 h-4 flex flex-col justify-between items-center transition-all duration-300">
          <motion.span
            animate={{ 
              rotate: isOpen ? 45 : 0, 
              y: isOpen ? 7 : 0,
              backgroundColor: isOpen ? "#111827" : "#4b5563"
            }}
            className="w-full h-[1.5px] block rounded-full"
          />
          <motion.span
            animate={{ 
              opacity: isOpen ? 0 : 1,
              backgroundColor: "#4b5563"
            }}
            className="w-full h-[1.5px] block rounded-full"
          />
          <motion.span
            animate={{ 
              rotate: isOpen ? -45 : 0, 
              y: isOpen ? -7 : 0,
              backgroundColor: isOpen ? "#111827" : "#4b5563"
            }}
            className="w-full h-[1.5px] block rounded-full"
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Minimal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-md"
            />

            {/* Clean Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed left-0 top-0 bottom-0 z-[110] w-[280px] bg-white/95 backdrop-blur-xl border-r border-gray-100 flex flex-col"
            >
              <div className="p-8 pt-24 space-y-12">
                {/* Branding */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    DOGS<span className="font-light text-gray-500">puntocero</span>
                  </h3>
                  <p className="text-xs text-[#5a9a56] font-medium tracking-widest uppercase opacity-70">Menú</p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-5">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleItemClick(item.id)}
                        className="w-full flex items-center gap-5 group outline-none"
                      >
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive 
                              ? "bg-[#7bc47a] text-white shadow-lg shadow-[#7bc47a]/20" 
                              : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span 
                          className={`text-lg transition-colors duration-300 ${
                            isActive ? "font-semibold text-gray-900" : "font-light text-gray-500 group-hover:text-gray-900"
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Minimalist Footer */}
              <div className="mt-auto p-8 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-light tracking-widest uppercase">
                  &copy; 2026 DogsPuntocero
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
