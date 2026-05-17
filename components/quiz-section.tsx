"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
}

export default function QuizSection({ quizStep, setQuizStep, quizAnswers, setQuizAnswers }) {
  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Scopri il Trattamento Ideale per Te
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Rispondi a queste semplici domande per trovare il trattamento più adatto alle tue esigenze.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {quizStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-medium text-pink-800 mb-4">Qual è la tua principale preoccupazione?</h3>
                <div className="space-y-3">
                  {[
                    "Rughe e segni dell'età",
                    "Pelle spenta e disidratata",
                    "Cellulite e ritenzione idrica",
                    "Stress e tensione muscolare",
                  ].map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, concern: option }))
                        setQuizStep(1)
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {quizStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-medium text-pink-800 mb-4">Con quale frequenza ti prendi cura di te?</h3>
                <div className="space-y-3">
                  {[
                    "Regolarmente, ogni settimana",
                    "Una volta al mese",
                    "Solo in occasioni speciali",
                    "Raramente, vorrei iniziare ora",
                  ].map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, frequency: option }))
                        setQuizStep(2)
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {quizStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-medium text-pink-800 mb-4">
                  Quanto tempo hai a disposizione per un trattamento?
                </h3>
                <div className="space-y-3">
                  {["30 minuti o meno", "Circa un'ora", "Fino a 90 minuti", "Posso dedicare più tempo"].map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setQuizAnswers((prev) => ({ ...prev, time: option }))
                          setQuizStep(3)
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        {option}
                      </motion.button>
                    ),
                  )}
                </div>
              </motion.div>
            )}

            {quizStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="inline-block p-4 bg-pink-100 rounded-full mb-6"
                  >
                    <CheckIcon className="h-12 w-12 text-pink-600" />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-pink-800 mb-4">Il Tuo Risultato</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    In base alle tue risposte, ecco il trattamento che fa per te:
                  </p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-pink-50 p-6 rounded-xl mb-8"
                  >
                    <p className="text-xl font-serif font-bold text-pink-800 mb-2">
                      Consigliamo: Trattamento Viso Anti-Age
                    </p>
                    <p className="text-gray-700 mb-6">
                      Questo trattamento è perfetto per combattere i segni dell'età e donare luminosità alla pelle.
                      Include pulizia profonda, massaggio e maschera nutriente.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl" asChild>
                        <Link href="#calendario">Prenota Ora</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.button
                    onClick={() => setQuizStep(0)}
                    whileHover={{ scale: 1.05 }}
                    className="text-pink-600 hover:text-pink-800 underline underline-offset-4"
                  >
                    Ricomincia il quiz
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
