"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays, setHours, setMinutes } from "date-fns"
import { it } from "date-fns/locale"
import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"

// Lazy load components that are not immediately visible
const LazyFAQSection = dynamic(() => import("@/components/faq-section"), {
  loading: () => <div className="py-20 min-h-[300px]"></div>,
  ssr: false,
})

const LazyQuizSection = dynamic(() => import("@/components/quiz-section"), {
  loading: () => <div className="py-20 bg-pink-50 min-h-[300px]"></div>,
  ssr: false,
})

const LazyGallerySection = dynamic(() => import("@/components/gallery-section"), {
  loading: () => <div className="py-20 min-h-[300px]"></div>,
  ssr: false,
})

const LazyReferralSection = dynamic(() => import("@/components/referral-section"), {
  loading: () => <div className="py-20 bg-pink-50 min-h-[300px]"></div>,
  ssr: false,
})

const LazyContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <div className="py-20 bg-pink-50 min-h-[300px]"></div>,
  ssr: false,
})

// Optimize video loading
const useOptimizedVideo = (videoRef) => {
  useEffect(() => {
    let observer

    if (videoRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Load video only when in viewport
              const video = videoRef.current
              if (video) {
                video.load()
                video.play().catch((e) => console.log("Auto-play prevented:", e))
                observer.unobserve(video)
              }
            }
          })
        },
        { threshold: 0.1 },
      )

      observer.observe(videoRef.current)
    }

    return () => {
      if (observer && videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [videoRef])
}

// Memoize expensive calculations
const useMemoizedValue = (value, dependencies) => {
  return React.useMemo(() => value, dependencies)
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const [selectedService, setSelectedService] = useState("")
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({
    concern: "",
    frequency: "",
    time: "",
  })
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Testimonials state moved to TestimonialsSection component

  // Refs per le sezioni
  const heroRef = useRef(null)
  const calendarRef = useRef(null)
  const videoRef = useRef(null)

  // Effetto parallasse e fade per l'hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true)
        console.log("Video loaded successfully")
      }

      video.addEventListener("loadeddata", handleLoadedData)

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
      }
    }
  }, [])

  // Genera orari disponibili per la data selezionata (simulazione)
  const availableTimeSlots = React.useMemo(() => {
    // Orari fissi per semplicità
    const baseHours = [9, 10, 11, 14, 15, 16, 17, 18]

    // Genera slot di 30 minuti
    const slots = []
    baseHours.forEach((hour) => {
      const date1 = setHours(setMinutes(new Date(date), 0), hour)
      const date2 = setHours(setMinutes(new Date(date), 30), hour)
      slots.push(date1, date2)
    })

    // Rimuove alcuni slot in modo casuale per simulare disponibilità
    return slots.filter(() => Math.random() > 0.3)
  }, [date])

  // Reset dell'orario selezionato quando cambia la data
  React.useEffect(() => {
    setSelectedTime(null)
  }, [date])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Countdown, visitor count e testimonial carousel gestiti nei rispettivi componenti

  // Debug assets
  useEffect(() => {
    console.log("Checking assets:")
    console.log("Video paths:", "/luxury-spa-serenity.mp4", "/spa-treatment.mp4")
    console.log(
      "Image paths:",
      "/images/trattamento-viso.png",
      "/images/ceretta.png",
      "/images/massaggio.png",
      "/images/skin-before.png",
      "/images/skin-after.png",
      "/images/maria-estetista.png",
    )
  }, [])

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth" })
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

  const shareOnWhatsApp = () => {
    const message = "Ho scoperto questo fantastico centro estetico! Dai un'occhiata: https://centrobellaroma.it"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank")
  }

  // Optimize video loading
  useOptimizedVideo(videoRef)

  return (
    <div className="relative">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-serif font-bold text-pink-600"
            >
              Centro Estetico <span className="text-pink-800">Bella</span>
            </motion.h1>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center ml-6 bg-pink-100 text-pink-800 rounded-full px-4 py-2 text-sm"
          >
            <span className="font-medium">⭐ Centro Estetico dell&apos;Anno 2024 &middot; 500+ clienti soddisfatte</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                <Link
                  href="#chi-siamo"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chi Siamo
                </Link>
                <Link
                  href="#servizi"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servizi
                </Link>
                <Link
                  href="#testimonianze"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonianze
                </Link>
                <Link
                  href="#galleria"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Galleria
                </Link>
                <Link
                  href="#contatti"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contatti
                </Link>
                <div className="flex items-center bg-pink-100 text-pink-800 rounded-full px-4 py-2 text-sm">
                  <span className="font-medium">⭐ Centro Estetico dell&apos;Anno 2024 &middot; 500+ clienti soddisfatte</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section — estratto come componente riutilizzabile */}
      <HeroSection
        heroRef={heroRef}
        videoRef={videoRef}
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        videoOpacity={videoOpacity}
        videoScale={videoScale}
        scrollYProgress={scrollYProgress}
        scrollToCalendar={scrollToCalendar}
      />

      {/* Chi Siamo - con transizione fluida dal video */}
      <section id="chi-siamo" className="relative py-20 bg-pink-50">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-pink-50 -translate-y-full"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <motion.div
              variants={slideUp}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/maria-estetista.png"
                alt="Maria - Titolare"
                fill
                className="object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: /images/maria-estetista.png`)
                  e.currentTarget.src = "/relaxing-spa-scene.png"
                }}
                loading="lazy"
              />
            </motion.div>

            <motion.div variants={slideUp} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-800">Chi Siamo</h2>
              <p className="text-lg text-gray-700">
                Il <span className="font-semibold">Centro Estetico Bella</span> nasce dalla passione di Maria, estetista
                con oltre 15 anni di esperienza nel settore della bellezza e del benessere.
              </p>
              <p className="text-lg text-gray-700">
                La nostra missione è offrire un'esperienza di bellezza completa, in un ambiente accogliente e
                rilassante, dove ogni cliente si sente speciale e curata nei minimi dettagli.
              </p>
              <p className="text-lg text-gray-700">
                Utilizziamo solo prodotti di alta qualità, selezionati con cura per garantire risultati eccellenti e
                duraturi, nel pieno rispetto della pelle e dell'ambiente.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Servizi */}
      <section id="servizi" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
              I Nostri Servizi
            </motion.h2>
            <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
              Offriamo una vasta gamma di trattamenti personalizzati per esaltare la tua bellezza naturale e regalarti
              momenti di puro relax.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerCards}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Trattamenti Viso",
                image: "/images/trattamento-viso.png",
                description:
                  "Pulizia profonda, trattamenti anti-age, idratanti e illuminanti per una pelle radiosa e giovane.",
                badge: "Più richiesto",
              },
              {
                title: "Ceretta",
                image: "/images/ceretta.png",
                description: "Epilazione con cera di alta qualità per risultati duraturi e una pelle liscia e morbida.",
                badge: null,
              },
              {
                title: "Massaggi",
                image: "/images/massaggio.png",
                description:
                  "Massaggi rilassanti, decontratturanti e drenanti per il benessere del corpo e della mente.",
                badge: "Novità",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={cardAnimation} whileHover="hover" className="h-full">
                <Card
                  className="bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 overflow-hidden h-full cursor-pointer"
                  onClick={scrollToCalendar}
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        console.error(`Failed to load image: ${service.image}`)
                        e.currentTarget.src = "/relaxing-spa-scene.png"
                      }}
                      loading="lazy"
                    />
                    {service.badge && (
                      <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                        service.badge === "Più richiesto" ? "bg-pink-600" : "bg-purple-600"
                      }`}>
                        {service.badge}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-pink-800 mb-3">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonianze — estratto come componente riutilizzabile con hover-pause */}
      <TestimonialsSection />

      {/* Galleria Prima & Dopo */}
      <LazyGallerySection />

      {/* Sezione Referral */}
      <LazyReferralSection shareOnWhatsApp={shareOnWhatsApp} />

      {/* Calendario */}
      <section id="calendario" ref={calendarRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-serif font-bold text-pink-800 mb-4">
              Prenota il Tuo Appuntamento
            </motion.h2>
            <motion.p variants={item} className="text-lg text-gray-700 max-w-3xl mx-auto">
              Seleziona una data e un orario disponibile per il tuo trattamento.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-pink-800 mb-4">Seleziona una data</h3>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => setDate(newDate || new Date())}
                      className="rounded-md border shadow p-3 mx-auto"
                      locale={it}
                      fromDate={new Date()}
                      toDate={addDays(new Date(), 60)}
                    />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-pink-800 mb-4">Seleziona un servizio</h3>
                  <div className="space-y-2">
                    {["Trattamento Viso", "Ceretta", "Massaggio", "Manicure", "Pedicure"].map((service, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="radio"
                          id={`service-${index}`}
                          name="service"
                          value={service}
                          checked={selectedService === service}
                          onChange={() => setSelectedService(service)}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                        />
                        <label htmlFor={`service-${index}`} className="ml-2 text-gray-700">
                          {service}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-pink-800 mb-4">
                    Orari disponibili per {format(date, "d MMMM yyyy", { locale: it })}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTimeSlots.map((slot, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedTime(slot)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-2 px-3 rounded-md border transition-colors ${
                          selectedTime === slot
                            ? "bg-pink-600 text-white border-pink-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-pink-300"
                        }`}
                      >
                        {format(slot, "HH:mm")}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium text-pink-800 mb-4">Riepilogo prenotazione</h3>
                  <motion.div
                    className="bg-pink-50 rounded-lg p-4 space-y-3"
                    whileHover={{
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700">
                      <span className="font-medium">Data:</span> {format(date, "d MMMM yyyy", { locale: it })}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Orario:</span>{" "}
                      {selectedTime ? format(selectedTime, "HH:mm") : "Seleziona un orario"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Servizio:</span> {selectedService || "Seleziona un servizio"}
                    </p>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        disabled={!selectedTime || !selectedService}
                        className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white"
                        onClick={() => alert("Prenotazione confermata! Ti aspettiamo in salone.")}
                      >
                        Conferma Prenotazione
                      </Button>
                    </motion.div>

                    <p className="text-xs text-gray-500 text-center mt-2">
                      Puoi annullare o modificare la tua prenotazione fino a 24 ore prima dell'appuntamento.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <LazyFAQSection />

      {/* Quiz per scegliere il servizio */}
      <LazyQuizSection
        quizStep={quizStep}
        setQuizStep={setQuizStep}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
      />

      {/* Contatti & Mappa */}
      <LazyContactSection />

      {/* Bubble WhatsApp persistente */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 left-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-white rounded-full shadow-lg pl-3 pr-5 py-3 cursor-pointer"
          onClick={() => window.open("https://wa.me/+39NUMEROCLIENTE", "_blank")}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-[#25D366] rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="h-5 w-5 fill-white">
              <path d="M147.934,27.58C131.344,9.804,108.767,0,83.652,0C37.866,0,0.399,37.466,0.399,83.252c0,14.694,3.836,29.027,11.094,41.653L0,175.552l52.499-13.732c12.177,6.638,25.901,10.147,39.7,10.147h0.035c45.765,0,83.233-37.466,83.233-83.252C175.467,66.135,164.524,45.354,147.934,27.58ZM83.652,152.148h-0.03c-12.4,0-24.543-3.337-35.124-9.666l-2.511-1.495L21.43,148.039l7.164-26.16-1.639-2.61c-6.814-10.872-10.413-23.426-10.413-36.348c0-37.6,30.666-68.266,68.306-68.266c18.227,0,35.354,7.106,48.225,20.007c12.87,12.9,19.976,30.027,19.956,48.259C153.029,121.482,122.363,152.148,83.652,152.148ZM121.358,100.635c-2.052-1.028-12.13-5.983-14.015-6.673c-1.884-0.67-3.257-1.028-4.629,1.028c-1.372,2.052-5.312,6.673-6.513,8.045c-1.2,1.372-2.4,1.551-4.448,0.522c-12.104-6.05-20.05-10.825-28.006-24.59c-2.1-3.623,2.1-3.377,6.02-11.241c0.67-1.372,0.335-2.565-0.175-3.593c-0.522-1.028-4.629-11.158-6.339-15.279c-1.671-4.013-3.361-3.466-4.629-3.526c-1.2-0.061-2.565-0.061-3.937-0.061c-1.372,0-3.593,0.522-5.478,2.565c-1.884,2.052-7.197,7.045-7.197,17.175c0,10.13,7.375,19.907,8.395,21.279c1.028,1.372,14.477,22.089,35.071,30.968c13.019,5.617,18.171,6.089,24.697,5.139c3.979-0.609,12.13-4.977,13.84-9.767c1.719-4.795,1.719-8.907,1.2-9.767C124.615,102.186,123.41,101.663,121.358,100.635Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Chatta con noi</p>
            <p className="text-xs text-green-600">✓ Risposta in 5 minuti</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
