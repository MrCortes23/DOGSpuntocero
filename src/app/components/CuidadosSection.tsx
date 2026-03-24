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
    subtitle: "Grooming profesional",
    image: "/images/dog-grooming.jpg",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5,
    title: "Juguetes",
    subtitle: "Juguetes para perros",
    image: "/images/dog-toys.webp",
    span: "col-span-1 row-span-1"
  }
]

export function CuidadosSection() {
  return (
    <section
      id="cuidados"
      className="min-h-screen lg:h-screen relative flex flex-col z-30"
      style={{
        background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)",
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 w-full relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 lg:mb-12 text-center"
          >
            <span className="text-[#5a9a56] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Guía esencial
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-5 tracking-tight">
              Cuidados para tu perro
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#A8E6A3] to-[#7DD3C0] rounded-full mx-auto" />
          </motion.header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
            {careItems.map((item, index) => (
              <motion.article
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`
                  ${item.id === 1 ? "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2" : "col-span-1"}
                  relative overflow-hidden rounded-2xl cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500
                  ${item.featured ? "min-h-[220px] sm:min-h-[260px] md:min-h-[460px]" : "min-h-[140px] md:min-h-[220px]"}
                `}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-90" />

                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className="text-xs font-semibold tracking-wider uppercase mb-1 block"
                        style={{
                          background: "linear-gradient(135deg, #A8E6A3, #7DD3C0)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {item.subtitle}
                      </p>
                      <h3 className={`text-white font-medium tracking-wide ${item.featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                        }`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#A8E6A3] border-2 border-white/20 shadow-lg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-[#A8E6A3]/60 transition-colors duration-500" />

              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Banner — acts as a separator */}
      <div
        className="relative py-4 px-8 flex-shrink-0 z-20 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
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