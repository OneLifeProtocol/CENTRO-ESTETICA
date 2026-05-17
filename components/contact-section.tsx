"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function ContactSection() {
  const [formState, setFormState] = useState({ nome: "", email: "", messaggio: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulazione invio (demo placeholder)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section id="contatti" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Contatti
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Siamo qui per rispondere a tutte le tue domande e aiutarti a prenotare il tuo trattamento.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Info + Mappa */}
          <motion.div variants={slideUp} className="space-y-8">
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-md flex-shrink-0">
                <MapPin className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-pink-800 mb-1">Indirizzo</h3>
                <p className="text-gray-700">Via [Nome Via] [Numero], [CAP] [Città]</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-md flex-shrink-0">
                <Phone className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-pink-800 mb-1">Telefono</h3>
                <p className="text-gray-700">+39 [Numero Telefono]</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-md flex-shrink-0">
                <Mail className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-pink-800 mb-1">Email</h3>
                <p className="text-gray-700">info@[tuocentro].it</p>
              </div>
            </motion.div>

            {/* Mappa placeholder */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.244799944823!2d12.4922309!3d41.9027835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRoma+RM!5e0!3m2!1sit!2sus!4v1678889876543!5m2!1sit!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </motion.div>

          {/* Mini Form di contatto */}
          <motion.div variants={slideUp}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-serif font-bold text-pink-800 mb-6">Inviaci un messaggio</h3>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Nome */}
                    <div>
                      <label htmlFor="contact-nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome e Cognome
                      </label>
                      <input
                        id="contact-nome"
                        type="text"
                        required
                        placeholder="[Il tuo nome]"
                        value={formState.nome}
                        onChange={(e) => setFormState((p) => ({ ...p, nome: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="[la-tua@email.it]"
                        value={formState.email}
                        onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Messaggio */}
                    <div>
                      <label htmlFor="contact-messaggio" className="block text-sm font-medium text-gray-700 mb-1">
                        Messaggio
                      </label>
                      <textarea
                        id="contact-messaggio"
                        required
                        rows={4}
                        placeholder="Come possiamo aiutarti?"
                        value={formState.messaggio}
                        onChange={(e) => setFormState((p) => ({ ...p, messaggio: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-6 text-base font-semibold"
                      >
                        {loading ? "Invio in corso..." : "Invia Messaggio →"}
                      </Button>
                    </motion.div>

                    <p className="text-xs text-gray-500 text-center">
                      Ti risponderemo entro 24 ore. Nessuno spam, promesso.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-center py-10 space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2"
                    >
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <h4 className="text-xl font-serif font-bold text-pink-800">Messaggio inviato!</h4>
                    <p className="text-gray-600">
                      Grazie per averci contattato. Ti risponderemo al più presto.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormState({ nome: "", email: "", messaggio: "" })
                      }}
                      className="text-pink-600 hover:text-pink-800 text-sm underline underline-offset-4 mt-4"
                    >
                      Invia un altro messaggio
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
