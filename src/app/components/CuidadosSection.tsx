import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6
    }
  })
}

const careItems = [
  {
    id: 1,
    title: "Nutrición",
    subtitle: "Alimentación balanceada",
    image: "/images/dog-food.jpg",
    span: "col-span-2 row-span-2",
    featured: true
  },
  {
    id: 2,
    title: "Ejercicio",
    subtitle: "Actividad diaria",
    image: "/images/dog-exercise.jpg",
    span: "col-span-1 row-span-1"
  },
  {
    id: 3,
    title: "Salud",
    subtitle: "Cuidado veterinario",
    image: "/images/dog-vet.jpg",
    span: "col-span-1 row-span-2"
  },
  {
    id: 4,
    title: "Higiene",
    subtitle: "Sanidad profesional",
    image: "/images/dog-grooming.jpg",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5,
    title: "Juguetes",
    subtitle: "Entretenimiento vital",
    image: "/images/dog-toys.jpg",
    span: "col-span-1 row-span-1"
  }
]

export function CuidadosSection() {
  return (
    <section
      id="cuidados"
      className="min-h-screen relative flex flex-col z-30 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)",
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 w-full relative z-10 max-w-[1320px] mx-auto">
        <div className="w-full">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-16 text-center"
          >
            <span className="text-[#5a9a56] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Guía
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-5 tracking-tight">
              Cuidados <span className="font-normal" style={{ color: "black" }}>esenciales</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#A8E6A3] to-[#7DD3C0] rounded-full mx-auto" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed">
              Descubre los pilares fundamentales para mantener a tu mejor amigo feliz, sano y lleno de vitalidad todos los días.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {careItems.map((item, index) => (
              <motion.article
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`
                  ${item.id === 1 ? "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2" : "col-span-1"}
                  relative flex flex-col p-3 md:p-4 rounded-3xl cursor-pointer group 
                  bg-white/40 backdrop-blur-md border border-white/60 
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] 
                  transition-all duration-500 overflow-hidden hover:bg-white/50
                  min-h-[320px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[320px]
                `}
              >
                {/* Image Container (Separated completely from the text) */}
                <div className="relative flex-1 rounded-2xl overflow-hidden mb-3 md:mb-4 bg-gray-50">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
                </div>

                {/* Text Bottom Section (Sitting cleanly inside the glass article) */}
                <div className="flex items-center justify-between px-1 shrink-0">
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-0.5 md:mb-1 text-[#5a9a56]">
                      {item.subtitle}
                    </p>
                    <h3 className={`text-gray-900 tracking-tight ${item.featured ? "text-xl md:text-2xl font-medium" : "text-base md:text-lg font-medium"}`}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-neutral-100 shadow-sm flex items-center justify-center -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#5a9a56]" />
                  </div>
                </div>

                {/* Outer Glassmorphism Border */}
                <div className="absolute inset-0 rounded-3xl border border-white/80 pointer-events-none" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Banner — acts as a separator */}
      <div
        className="relative py-4 px-8 flex-shrink-0 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.12)] mt-auto"
        style={{
          background: "linear-gradient(135deg, rgba(168,230,163,0.15), rgba(214,240,255,0.18))",
          borderTop: "1px solid rgba(168,230,163,0.15)",
        }}
      >
        <div className="text-center">
          <p className="text-gray-700 font-medium text-sm">
            Continúa alimentando a tu campeón
          </p>
          <p className="text-gray-400 text-xs mt-0.5 font-light">
            Sigue bajando para conocer los mejores alimentos y precauciones nutricionales.
          </p>
        </div>
      </div>
    </section>
  )
}