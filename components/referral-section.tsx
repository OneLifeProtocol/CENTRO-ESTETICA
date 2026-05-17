"use client"

import { motion } from "framer-motion"
import { Share2, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
}

export default function ReferralSection({ shareOnWhatsApp }) {
  return (
    <section id="referral" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Condividi e Risparmia
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Condividi la tua esperienza con le amiche e ottieni uno sconto speciale sul tuo prossimo trattamento.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={slideUp} className="space-y-8">
            <h3 className="text-2xl font-serif font-bold text-pink-800 mb-6">Come Funziona</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-medium text-pink-800 mb-1">Condividi su WhatsApp</h4>
                  <p className="text-gray-700">
                    Condividi il nostro centro estetico con le tue amiche tramite WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-medium text-pink-800 mb-1">La tua amica prenota</h4>
                  <p className="text-gray-700">
                    Quando la tua amica prenota un trattamento, deve menzionare il tuo nome.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-medium text-pink-800 mb-1">Ricevi il tuo sconto</h4>
                  <p className="text-gray-700">
                    Al tuo prossimo appuntamento, riceverai uno sconto speciale sul trattamento scelto.
                  </p>
                </div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2 px-6 py-6"
                onClick={shareOnWhatsApp}
              >
                <Share2 className="h-5 w-5" />
                <span>CONDIVIDI SU WHATSAPP</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={slideUp} className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-pink-100 text-pink-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
                Premio Referral
              </div>
              <h3 className="text-3xl font-serif font-bold text-pink-800 mb-2">50% di Sconto</h3>
              <p className="text-xl text-gray-700">sul tuo prossimo trattamento</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Valido su qualsiasi trattamento</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Cumulabile fino a 3 referral (max 50%)</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Valido per 3 mesi dalla prenotazione dell'amica</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                * Termini e condizioni: Lo sconto è valido solo se la persona presentata effettua un trattamento. Non
                cumulabile con altre promozioni in corso. La direzione si riserva il diritto di modificare o terminare
                la promozione in qualsiasi momento.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
