"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  [
    {
      name: "Laura B.",
      text: "Ho provato il trattamento viso anti-age e la mia pelle è rinata! Un'estetista eccezionale, competente e professionale. Consigliatissimo!",
      rating: 5,
    },
    {
      name: "Giulia R.",
      text: "Ambiente accogliente e rilassante. I massaggi sono fantastici, mi hanno aiutato molto con i dolori alla schiena. Tornerò sicuramente!",
      rating: 5,
    },
    {
      name: "Francesca V.",
      text: "La ceretta è praticamente indolore e i risultati durano a lungo. Un'esperienza piacevole e super professionale!",
      rating: 5,
    },
  ],
  [
    {
      name: "Martina N.",
      text: "Ho fatto un pacchetto di massaggi drenanti e i risultati sono stati incredibili. La cellulite è visibilmente ridotta e mi sento molto più leggera!",
      rating: 5,
    },
    {
      name: "Alessandra C.",
      text: "Vengo qui da più di un anno per manicure e pedicure. Lavoro impeccabile, prodotti di qualità e ambiente super pulito.",
      rating: 5,
    },
    {
      name: "Roberta M.",
      text: "Il trattamento corpo rassodante è stato una rivelazione! Dopo la gravidanza avevo perso tono, ma ho ritrovato la mia forma. Grazie!",
      rating: 5,
    },
  ],
  [
    {
      name: "Sofia R.",
      text: "La pulizia del viso è stata incredibile! La mia pelle non è mai stata così luminosa. Sa consigliare i prodotti giusti per ogni tipo di pelle.",
      rating: 5,
    },
    {
      name: "Elena M.",
      text: "Trattamento anti-cellulite eccezionale! Dopo solo 5 sedute ho visto risultati visibili. Professionalità e competenza al top!",
      rating: 5,
    },
    {
      name: "Chiara E.",
      text: "Manicure e pedicure semipermanente perfetti! Durano tantissimo e i colori sono stupendi. Ambiente rilassante e personale gentilissimo.",
      rating: 5,
    },
  ],
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    transition: { duration: 0.3 },
  },
}

export default function TestimonialsSection() {
  const [currentSet, setCurrentSet] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isHovered])

  return (
    <section id="testimonianze" className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Cosa Dicono di Noi
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Le esperienze delle nostre clienti sono la nostra migliore pubblicità.
          </motion.p>
        </motion.div>

        {/* Carousel con pausa su hover/touch */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {testimonials[currentSet].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-pink-100 h-full transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                      </div>
                      <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                      <p className="font-medium text-pink-800">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSet(i)}
              aria-label={`Vai al gruppo recensioni ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSet ? "bg-pink-600 w-6" : "bg-pink-200 w-2"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6 text-lg"
              asChild
            >
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                SFOGLIA RECENSIONI SU GOOGLE
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
