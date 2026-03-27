import { PawPrint } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
  return (
    <section
      className="min-h-screen lg:h-screen relative flex flex-col z-50 overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)",
      }}
    >
      {/* Subtle ambient shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #A8E6A3 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #D6F0FF 0%, transparent 65%)" }}
        />
      </div>


      {/* Main Hero — fills available space */}
      <div className="flex-1 flex items-center relative px-6 sm:px-10 lg:px-16 pt-24 lg:pt-0 pb-12 lg:pb-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Title Section */}

              <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-light text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Tu mejor{" "}
                <br className="hidden sm:block" />
                <span
                  className="font-medium inline-block"
                  style={{
                    background: "linear-gradient(135deg, #5a9a56, #4a8fa8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    paddingRight: "0.1em", // prevent clipping
                  }}
                >
                  amigo
                </span>{" "}
                merece{" "}
                <br className="hidden sm:block" />
                lo mejor
              </h1>

              <p className="text-gray-500 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-[460px] mx-auto lg:mx-0 font-light">
                Descubre todo sobre razas, cuidados, alimentación y más.
                Tu guía completa para una vida feliz junto a tu perro.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
                <button
                  className="w-full sm:w-auto cursor-pointer px-8 py-4 rounded-full text-[15px] font-medium text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7bc47a, #6db8cc)",
                    boxShadow: "0 10px 30px rgba(123,196,122,0.35), 0 4px 12px rgba(0,0,0,0.06)",
                  }}
                  onClick={() => document.getElementById('razas')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explorar Razas
                </button>
                <button
                  className="w-full sm:w-auto cursor-pointer px-8 py-4 rounded-full text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:border-[#A8E6A3]/80 hover:bg-[#A8E6A3]/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                  onClick={() => document.getElementById('cuidados')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Aprender Más
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-end items-end self-end lg:mt-0"
            >
              {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-[340px] sm:max-w-lg lg:max-w-none lg:w-auto object-contain z-10 pointer-events-none"
                style={{
                  maxHeight: "max(35vh, min(70vh, 750px))",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))",
                }}
              >
                <source src="https://res.cloudinary.com/dkbmhzqvj/video/upload/v1774222223/perrito_f5hxya.webm" type="video/mp4" />
              </video> */}

              <img
                src="/images/collin.webp"
                alt="Perro Collin"
                className="w-full max-w-[480px] sm:max-w-lg lg:max-w-none lg:w-auto object-contain z-10"
                style={{
                  maxHeight: "max(70vh, min(90vh, 900px))",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Banner — always at bottom */}
      <div
        className="relative py-4 px-8 flex-shrink-0 z-20 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
        style={{
          background: "linear-gradient(135deg, rgba(168,230,163,0.15), rgba(214,240,255,0.18))",
          borderTop: "1px solid rgba(168,230,163,0.15)",
        }}
      >
        <div className="text-center">
          <p className="text-gray-700 font-medium text-sm">
            Tu compañero fiel te espera
          </p>
          <p className="text-gray-400 text-xs mt-0.5 font-light">
            Encuentra la raza perfecta y dale a tu perro la mejor vida posible.
          </p>
        </div>
      </div>
    </section>
  )
}