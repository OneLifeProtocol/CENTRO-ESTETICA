"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export default function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Domande Frequenti
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Trova le risposte alle domande più comuni sui nostri servizi.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Quanto dura un trattamento viso?",
                answer:
                  "I nostri trattamenti viso durano in media 60 minuti, ma possono variare da 45 a 90 minuti a seconda del tipo di trattamento scelto e delle esigenze specifiche della pelle.",
              },
              {
                question: "La ceretta fa male?",
                answer:
                  "Utilizziamo cere di alta qualità e tecniche professionali per minimizzare il dolore. La sensazione varia da persona a persona, ma la maggior parte delle clienti trova il trattamento molto tollerabile.",
              },
              {
                question: "Con che frequenza dovrei fare un massaggio?",
                answer:
                  "Per risultati ottimali, consigliamo un massaggio ogni 2-4 settimane. Tuttavia, la frequenza ideale dipende dalle tue esigenze personali e può essere discussa durante la consulenza.",
              },
              {
                question: "Posso annullare o riprogrammare un appuntamento?",
                answer:
                  "Sì, puoi annullare o riprogrammare il tuo appuntamento con almeno 24 ore di anticipo senza alcuna penalità. Per modifiche con meno preavviso, potrebbe essere applicata una tariffa.",
              },
              {
                question: "Quali metodi di pagamento accettate?",
                answer:
                  "Accettiamo pagamenti in contanti, carte di credito/debito e bonifici bancari. Offriamo anche la possibilità di acquistare pacchetti di trattamenti a tariffe scontate.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-pink-50 transition-colors text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
