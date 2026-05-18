"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const staggerCards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
}

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

export default function GallerySection() {
  return (
    <section id="galleria" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
            Prima & Dopo
          </motion.h2>
          <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Guarda i risultati dei nostri trattamenti e scopri la differenza che possiamo fare.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerCards}
          className="grid md:grid-cols-2 gap-8"
        >
          {[
            {
              title: "Trattamento Viso Anti-Age",
              before: "/images/skin-before.png",
              after: "/images/skin-after.png",
            },
            {
              title: "Trattamento Corpo Rassodante",
              before: "/prima-2.png",
              after: "/dopo-2.png",
            },
          ].map((item, index) => (
            <motion.div key={index} variants={cardAnimation} whileHover="hover" className="space-y-4">
              <h3 className="text-xl font-medium text-pink-800 text-center">{item.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="space-y-2" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={item.before || "/placeholder.svg"}
                      alt="Prima"
                      fill
                      loading="lazy"
                      className="object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${item.before}`)
                        e.currentTarget.src = "/relaxing-spa-scene.png"
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2">
                      Prima
                    </div>
                  </div>
                </motion.div>
                <motion.div className="space-y-2" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={item.after || "/placeholder.svg"}
                      alt="Dopo"
                      fill
                      loading="lazy"
                      className="object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${item.after}`)
                        e.currentTarget.src = "/relaxing-spa-scene.png"
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-pink-600/70 text-white text-center py-2">
                      Dopo
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
