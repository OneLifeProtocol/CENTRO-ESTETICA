"use client"

import { type RefObject } from "react"
import { motion, type MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  heroRef: RefObject<HTMLElement | null>
  videoRef: RefObject<HTMLVideoElement | null>
  heroOpacity: MotionValue<number>
  heroScale: MotionValue<number>
  videoOpacity: MotionValue<number>
  videoScale: MotionValue<number>
  scrollYProgress: MotionValue<number>
  scrollToCalendar: () => void
}

export default function HeroSection({
  heroRef,
  videoRef,
  heroOpacity,
  heroScale,
  videoOpacity,
  videoScale,
  scrollYProgress,
  scrollToCalendar,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef as RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Video background con parallax fade */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity: videoOpacity, scale: videoScale }}
      >
        <video
          ref={videoRef as RefObject<HTMLVideoElement>}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/0518.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay semitrasparente */}
      <div
        className="absolute inset-0 bg-pink-950/50 z-10"
      />

      {/* Contenuto Hero */}
      <div className="container mx-auto px-4 z-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 flex flex-col items-center"
          >
            <span className="text-white mb-3 relative drop-shadow-lg">
              RITROVA TE STESSA
              <span className="absolute inset-0 blur-md bg-white/10 -z-10 animate-pulse" />
            </span>
            <span className="text-white relative drop-shadow-lg">
              UN TOCCO ALLA VOLTA
              <span className="absolute inset-0 blur-md bg-white/10 -z-10 animate-pulse" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/90 text-lg md:text-xl mb-10 drop-shadow-md max-w-xl mx-auto leading-relaxed"
          >
            Il tuo centro estetico di riferimento per trattamenti viso,
            corpo e massaggi premium.
          </motion.p>

          {/* CTA primaria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-10 py-7 text-lg font-semibold tracking-wide shadow-xl shadow-pink-900/30"
              onClick={scrollToCalendar}
            >
              PRENOTA IL TUO TRATTAMENTO →
            </Button>
          </motion.div>

          {/* Social proof sotto CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 flex items-center justify-center gap-2 text-white/80 text-sm"
          >
            <span>⭐⭐⭐⭐⭐</span>
            <span>500+ clienti soddisfatte · Nessun pagamento anticipato</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
