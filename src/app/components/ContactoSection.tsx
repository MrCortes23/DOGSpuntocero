"use client"

import { Mail, Phone, MapPin, User, AtSign, MessageSquare, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { motion } from "motion/react"

export function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      id="contacto"
      className="min-h-screen relative flex flex-col z-30 lg:overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-48 h-48 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #A8E6A3 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #D6F0FF 0%, transparent 70%)" }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 w-full relative z-10 max-w-[1320px] mx-auto">
        <div className="w-full">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-16 text-center"
          >
            <span className="text-[#5a9a56] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Contacto
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-5 tracking-tight">
              ¿Tienes alguna <span className="font-normal" style={{ color: "black" }}>pregunta?</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#A8E6A3] to-[#7DD3C0] rounded-full mx-auto" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed">
              Gracias por tu interés en nuestros servicios. Completa el formulario o escríbenos a{" "}
              <a href="mailto:contacto@dogspuntocero.com" className="text-[#5a9a56] hover:underline font-medium">
                contacto@dogspuntocero.com
              </a>{" "}
              y te responderemos a la brevedad.
            </p>
          </motion.header>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 sm:gap-12 lg:gap-10 items-center">

            {/* Left Column - Image and Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Dog Image with floating icons */}
              <div className="relative max-w-[340px] sm:max-w-md mx-auto lg:ml-auto lg:mr-0">
                {/* Floating decorative icons */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg z-20"
                  style={{ background: "linear-gradient(135deg, #A8E6A3, #7DD3C0)", boxShadow: "0 10px 25px rgba(168, 230, 163, 0.4)" }}
                >
                  <AtSign className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-3 sm:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-lg z-20"
                  style={{ background: "linear-gradient(135deg, #7DD3C0, #D6F0FF)", boxShadow: "0 10px 25px rgba(125, 211, 192, 0.4)" }}
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.8, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/4 -left-4 sm:-left-6 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-lg z-20 bg-white"
                  style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" }}
                >
                  <Mail className="w-4 h-4 text-[#5a9a56]" />
                </motion.div>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md p-5 sm:p-8 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] group align-center">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    src="/images/dogmessage.png"
                    alt="Perro amigable con carta"
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form and Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[340px] sm:max-w-md mx-auto lg:mx-0 lg:max-w-none"
            >
              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre *"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 h-12 md:h-14 rounded-2xl border-neutral-200 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-[#5a9a56] focus:ring-1 focus:ring-[#5a9a56]/20 transition-all font-light"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        id="apellido"
                        name="apellido"
                        type="text"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 h-12 md:h-14 rounded-2xl border-neutral-200 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-[#5a9a56] focus:ring-1 focus:ring-[#5a9a56]/20 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <AtSign className="w-4 h-4" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 h-12 md:h-14 rounded-2xl border-neutral-200 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-[#5a9a56] focus:ring-1 focus:ring-[#5a9a56]/20 transition-all font-light"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      placeholder="¿En qué podemos ayudarte? *"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl border-neutral-200 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-[#5a9a56] focus:ring-1 focus:ring-[#5a9a56]/20 resize-none transition-all font-light"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-medium h-12 md:h-14 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100 flex items-center justify-center gap-2 group cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #7bc47a, #6db8cc)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando mensaje...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Quick info below form */}
                <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 text-center md:text-left">
                    <div className="w-8 h-8 rounded-full bg-[#A8E6A3]/20 flex items-center justify-center mx-auto md:mx-0 mb-1">
                      <Phone className="w-4 h-4 text-[#5a9a56]" />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Llámanos</p>
                    <p className="text-sm text-gray-700">+34 123 456 789</p>
                  </div>
                  <div className="flex flex-col gap-1 text-center md:text-left">
                    <div className="w-8 h-8 rounded-full bg-[#D6F0FF]/40 flex items-center justify-center mx-auto md:mx-0 mb-1">
                      <MapPin className="w-4 h-4 text-[#4a8fa8]" />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Encuéntranos</p>
                    <p className="text-sm text-gray-700">Madrid, España</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Banner — acts as a separator / footer extension */}
      <div
        className="relative py-4 px-8 flex-shrink-0 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        style={{
          background: "linear-gradient(135deg, rgba(168,230,163,0.15), rgba(214,240,255,0.18))",
          borderTop: "1px solid rgba(168,230,163,0.15)",
        }}
      >
        <div className="text-center">
          <p className="text-gray-700 font-medium text-sm">
            Tus dudas son importantes
          </p>
          <p className="text-gray-400 text-xs mt-0.5 font-light">
            Responderemos a tu consulta a la mayor brevedad posible.
          </p>
        </div>
      </div>
    </section>
  )
}
