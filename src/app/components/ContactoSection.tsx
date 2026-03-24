import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactoSection() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-8 lg:px-16 flex items-center" style={{ background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)" }}>
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-[#A8E6A3] to-[#D6F0FF] rounded-full"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl">Contáctanos</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl">
            ¿Tienes preguntas sobre el cuidado de tu perro? Estamos aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="mb-8 text-2xl">Información de Contacto</h3>

            <motion.div
              whileHover={{ x: 8, scale: 1.02 }}
              className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white shadow-[6px_6px_20px_rgba(0,0,0,0.08),-6px_-6px_20px_rgba(255,255,255,0.9)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15),-10px_-10px_30px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D6F0FF] to-[#A8E6A3] flex items-center justify-center flex-shrink-0">
                <Mail className="w-7 h-7 text-black" />
              </div>
              <div>
                <h4 className="mb-2 text-lg">Email</h4>
                <p className="text-gray-600">contacto@mundocanino.com</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 8, scale: 1.02 }}
              className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white shadow-[6px_6px_20px_rgba(0,0,0,0.08),-6px_-6px_20px_rgba(255,255,255,0.9)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15),-10px_-10px_30px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8E6A3] to-[#D6F0FF] flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-black" />
              </div>
              <div>
                <h4 className="mb-2 text-lg">Teléfono</h4>
                <p className="text-gray-600">+34 123 456 789</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 8, scale: 1.02 }}
              className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white shadow-[6px_6px_20px_rgba(0,0,0,0.08),-6px_-6px_20px_rgba(255,255,255,0.9)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15),-10px_-10px_30px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE5E5] to-[#FFB8B8] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-black" />
              </div>
              <div>
                <h4 className="mb-2 text-lg">Dirección</h4>
                <p className="text-gray-600">Calle de los Perros 123, Madrid, España</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-[10px_10px_30px_rgba(0,0,0,0.12),-10px_-10px_30px_rgba(255,255,255,0.9)]"
          >
            <h3 className="mb-8 text-2xl">Envíanos un Mensaje</h3>

            <form className="space-y-6">
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[#A8E6A3] transition-all duration-300 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[#A8E6A3] transition-all duration-300 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  rows={6}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[#A8E6A3] transition-all duration-300 resize-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 font-medium"
              >
                <span>Enviar Mensaje</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
