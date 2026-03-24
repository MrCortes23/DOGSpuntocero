import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Send, Bot, Sparkles } from "lucide-react"
import { useChat } from "@ai-sdk/react"

const nutritionTopics = [
  {
    id: 1,
    title: "Alimentación según edad",
    icon: "01",
    content: {
      description: "La nutrición de tu perro debe adaptarse a cada etapa de su vida para garantizar un desarrollo óptimo.",
      items: [
        { label: "Cachorros (0-12 meses)", detail: "Alto contenido proteico, calcio y DHA para desarrollo cerebral" },
        { label: "Adultos (1-7 años)", detail: "Dieta balanceada con proteínas moderadas y fibra" },
        { label: "Senior (7+ años)", detail: "Menor contenido calórico, suplementos para articulaciones" }
      ]
    }
  },
  {
    id: 2,
    title: "Alimentos prohibidos",
    icon: "02",
    content: {
      description: "Algunos alimentos comunes pueden ser tóxicos para los perros. Evita estos a toda costa.",
      items: [
        { label: "Chocolate y cafeína", detail: "Contienen teobromina, tóxico para el sistema nervioso" },
        { label: "Uvas y pasas", detail: "Pueden causar insuficiencia renal aguda" },
        { label: "Cebolla y ajo", detail: "Dañan los glóbulos rojos causando anemia" }
      ]
    }
  },
  {
    id: 3,
    title: "Porciones recomendadas",
    icon: "03",
    content: {
      description: "La cantidad de comida depende del peso, edad y nivel de actividad de tu perro.",
      items: [
        { label: "Perros pequeños (1-10 kg)", detail: "1/2 a 1 taza diaria dividida en 2 comidas" },
        { label: "Perros medianos (10-25 kg)", detail: "1 a 2 tazas diarias divididas en 2 comidas" },
        { label: "Perros grandes (25-45 kg)", detail: "2 a 3 tazas diarias divididas en 2 comidas" }
      ]
    }
  },
  {
    id: 4,
    title: "Suplementos esenciales",
    icon: "04",
    content: {
      description: "Los suplementos pueden mejorar la salud general de tu perro cuando se usan correctamente.",
      items: [
        { label: "Omega 3 y 6", detail: "Mejora el pelaje y reduce inflamación" },
        { label: "Glucosamina", detail: "Protege las articulaciones y cartílagos" },
        { label: "Probióticos", detail: "Favorece la salud digestiva" }
      ]
    }
  }
]

function NutritionChatbox() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat({
    api: "/api/nutritionai",
    onError: (err) => {
      console.error("Chat Error:", err);
    }
  })

  // Función de scroll optimizada para streaming
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth"
      });
    }
  }

  // Effect para scroll automático cuando hay nuevos mensajes o streaming
  useEffect(() => {
    // Usamos requestAnimationFrame para asegurar que el scroll ocurra después del render
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading])

  const suggestedQuestions = [
    "¿Qué debe comer un cachorro?",
    "¿Cuánta comida darle a mi perro?",
    "Dieta para perro con sobrepeso"
  ]

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/60 overflow-hidden h-[450px] md:h-[550px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="px-6 py-4 md:py-5 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d4a2b] rounded-xl md:rounded-2xl flex items-center justify-center">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <h4 className="font-normal text-gray-800 text-sm md:text-base">Asistente Nutricional</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500/80 rounded-full animate-pulse" />
              <p className="text-[10px] md:text-xs text-gray-500">NutriCan en línea</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`flex-1 ${messages.length === 0 ? "overflow-y-hidden" : "overflow-y-auto"} p-4 md:p-5 space-y-4 scroll-smooth`}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
            </div>
            <p className="text-gray-600 text-sm mb-1 font-normal">
              Pregúntame sobre nutrición canina
            </p>
            <p className="text-gray-400 text-xs mb-6 max-w-[200px] font-light">
              Dietas, alimentos, porciones y recomendaciones expertas
            </p>

            <div className="space-y-2 w-full max-w-xs">
              {suggestedQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => {
                    append({ role: "user", content: question })
                  }}
                  className="w-full text-left px-4 py-3 bg-neutral-50/50 hover:bg-neutral-100/50 border border-neutral-100/50 rounded-xl text-xs md:text-sm text-gray-500 transition-all hover:scale-[1.01] active:scale-[0.99] font-light"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message: any) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.role === "user"
                ? "bg-[#5a9a56] text-white rounded-2xl rounded-br-none shadow-sm"
                : "bg-neutral-100/80 text-gray-700 rounded-2xl rounded-bl-none"
                }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-100/80 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-neutral-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-neutral-100/50 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#5a9a56]/20 placeholder:text-gray-400 transition-all font-light"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#5a9a56] text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[#4d8649] transition-all active:scale-95 disabled:opacity-40 shadow-sm"
          >
            <Send className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2 font-light">
          NutriCan puede cometer errores. Considera consultar a un veterinario.
        </p>
      </form>
    </div>
  )
}

export function AlimentacionSection() {
  const [activeFolder, setActiveFolder] = useState<number | null>(1)

  return (
    <section
      id="alimentacion"
      className="min-h-screen relative flex flex-col z-30 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f4faf4 0%, #edf6fa 40%, #f7fbf7 70%, #f0f7fb 100%)",
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full relative z-10 max-w-[1320px] mx-auto">
        <div className="w-full">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-16 text-center lg:text-center"
          >
            <p className="text-xs md:text-sm tracking-widest text-[#5a9a56]/80 uppercase mb-3 font-medium">
              Guía completa para tu mejor amigo
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 tracking-tight leading-tight">
              Nutrición <span className="font-normal" style={{ color: "black" }}>Especializada</span>
            </h2>
          </motion.header>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Carpetas apiladas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-0 mb-8 lg:mb-0 w-full"
            >
              {nutritionTopics.map((topic, index) => {
                const isActive = activeFolder === topic.id

                return (
                  <motion.div
                    key={topic.id}
                    className="relative"
                    style={{
                      zIndex: isActive ? 50 : index,
                      marginTop: index === 0 ? 0 : -10
                    }}
                    animate={{
                      y: isActive ? -8 : 0,
                      scale: isActive ? 1.01 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      onClick={() => setActiveFolder(isActive ? null : topic.id)}
                      className="cursor-pointer group"
                    >
                      {/* Tab de la carpeta */}
                      <div className="flex items-end ml-4 md:ml-6">
                        <div
                          className={`
                            px-4 md:px-5 py-2 rounded-t-xl text-[10px] md:text-xs font-medium tracking-wider uppercase
                            transition-all duration-300
                            ${isActive
                              ? "bg-[#5a9a56] text-white shadow-md shadow-[#5a9a56]/10"
                              : "bg-[#A8E6A3]/10 text-[#5a9a56] group-hover:bg-[#A8E6A3]/20"
                            }
                          `}
                        >
                          {topic.icon}
                        </div>
                      </div>

                      {/* Cuerpo de la carpeta */}
                      <div
                        className={`
                          relative rounded-2xl rounded-tl-none overflow-hidden
                          transition-all duration-300
                          ${isActive
                            ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#5a9a56]/10"
                            : "bg-white/50 border border-neutral-200/40 hover:border-[#5a9a56]/20 backdrop-blur-sm"
                          }
                        `}
                      >
                        <div className="p-5 md:p-6">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`
                                text-base md:text-lg font-normal transition-colors duration-300
                                ${isActive ? "text-neutral-800" : "text-gray-500"}
                              `}
                            >
                              {topic.title}
                            </h3>
                            <motion.div
                              animate={{ rotate: isActive ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown
                                className={`
                                  w-4 h-4 md:w-5 md:h-5 transition-colors duration-300
                                  ${isActive ? "text-neutral-400" : "text-neutral-300"}
                                `}
                              />
                            </motion.div>
                          </div>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-500 mt-4 text-xs md:text-sm leading-relaxed font-light">
                                  {topic.content.description}
                                </p>

                                <div className="mt-5 space-y-2 md:space-y-3">
                                  {topic.content.items.map((item, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.08 }}
                                      className="bg-neutral-50/30 rounded-xl p-3 md:p-4 border border-neutral-100/50 hover:bg-white transition-colors"
                                    >
                                      <h4 className="font-medium text-xs md:text-sm text-neutral-800">
                                        {item.label}
                                      </h4>
                                      <p className="text-gray-500 text-[11px] md:text-sm mt-1 font-light">
                                        {item.detail}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Chatbox integrado */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-8"
            >
              <NutritionChatbox />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Banner — Separador estándar del proyecto */}
      <div
        className="relative py-8 px-8 flex-shrink-0 z-20 shadow-[0_-12px_30px_rgba(0,0,0,0.02)]"
        style={{
          background: "linear-gradient(135deg, rgba(90,154,86,0.05), rgba(109,184,204,0.08))",
          borderTop: "1px solid rgba(90,154,86,0.1)",
        }}
      >
        <div className="text-center">
          <p className="text-neutral-600 font-normal text-sm">
            ¿Tienes más dudas sobre la nutrición de tu perro?
          </p>
          <p className="text-neutral-400 text-xs mt-1 font-light">
            Consulta con nuestro asistente IA.
          </p>
        </div>
      </div>
    </section>
  )
}
