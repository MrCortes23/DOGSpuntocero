import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dogs = [
  {
    id: 1,
    src: "/images/dog-1.png",
    name: "Golden Retriever",
    origin: "Escocia",
    temperament: "Amigable, Confiable, Inteligente",
    description:
      "Conocido por su naturaleza amable y su pelaje dorado brillante. Excelente compañero familiar.",
  },
  {
    id: 2,
    src: "/images/dog-2.png",
    name: "Husky Siberiano",
    origin: "Siberia",
    temperament: "Leal, Energético, Juguetón",
    description:
      "Raza de trabajo con ojos cautivadores y un espíritu aventurero inigualable.",
  },
  {
    id: 3,
    src: "/images/dog-3.png",
    name: "Pastor Alemán",
    origin: "Alemania",
    temperament: "Valiente, Seguro, Inteligente",
    description:
      "Una de las razas más versátiles, conocida por su lealtad y capacidad de trabajo.",
  },
  {
    id: 4,
    src: "/images/dog-4.png",
    name: "Labrador Retriever",
    origin: "Canadá",
    temperament: "Activo, Gentil, Sociable",
    description:
      "Raza popular mundialmente, perfecta para familias activas y amantes del aire libre.",
  },
  {
    id: 5,
    src: "/images/dog-5.png",
    name: "Border Collie",
    origin: "Reino Unido",
    temperament: "Atlético, Inteligente, Alerta",
    description:
      "Considerado el perro más inteligente del mundo, ideal para dueños activos.",
  },
];

export function RazasSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  const currentDog = dogs[currentIndex];

  return (
    <section className="min-h-screen lg:h-screen relative flex flex-col bg-[linear-gradient(160deg,#ffffff_0%,#f4faf4_100%)] z-40 overflow-x-hidden" id="razas">
      <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-16 w-full relative z-10 lg:overflow-visible">
        <div className="max-w-7xl mx-auto w-full py-8 lg:py-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 lg:mb-12"
          >
            <span className="text-[#5a9a56] font-medium text-sm tracking-widest uppercase">
              Explora
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mt-2 tracking-tight">
              Razas Destacadas
            </h2>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative h-[45vh] lg:h-[55vh] max-h-[500px] w-full max-w-md mx-auto lg:mx-0 flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative h-full w-full rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)]"
                >
                  <img
                    src={currentDog.src}
                    alt={currentDog.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute -bottom-6 right-4 sm:right-0 flex gap-3 z-30">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-all hover:opacity-90 shadow-md transform hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7bc47a, #6db8cc)" }}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="lg:pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Counter */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
                    <span className="text-4xl lg:text-5xl font-light text-[#5a9a56]">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400 font-light text-sm lg:text-base">
                      {String(dogs.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3 tracking-tight">
                    {currentDog.name}
                  </h3>

                  {/* Origin */}
                  <p className="text-gray-500 font-medium text-sm tracking-wide mb-5">
                    Origen: <span className="font-light">{currentDog.origin}</span>
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 lg:text-lg leading-relaxed mb-6 font-light">
                    {currentDog.description}
                  </p>

                  {/* Temperament */}
                  <div className="flex flex-wrap gap-2">
                    {currentDog.temperament.split(", ").map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1.5 rounded-full bg-[#A8E6A3]/10 border border-[#A8E6A3]/30 text-[#5a9a56] font-medium text-xs lg:text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center lg:justify-start gap-2 mt-8 lg:mt-10">
                {dogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "w-8 bg-[#7bc47a]"
                      : "w-4 bg-gray-200 hover:bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner — acts as a separator */}
      <div
        className="relative py-4 px-8 flex-shrink-0 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        style={{
          background: "linear-gradient(135deg, rgba(168,230,163,0.15), rgba(214,240,255,0.18))",
          borderTop: "1px solid rgba(168,230,163,0.15)",
        }}
      >
        <div className="text-center">
          <p className="text-gray-700 font-medium text-sm">
            Descubre lo que necesitas
          </p>
          <p className="text-gray-400 text-xs mt-0.5 font-light">
            Continúa bajando para aprender sobre cuidados esenciales y alimentación.
          </p>
        </div>
      </div>
    </section>
  );
}