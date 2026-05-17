import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata = {
  title: "Centro Estetico [Nome] - Bellezza e Benessere",
  description:
    "Centro estetico professionale a [Città]. Trattamenti viso, ceretta, massaggi e molto altro per il tuo benessere.",
  metadataBase: new URL("https://[tuo-sito].it"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Centro Estetico [Nome] - Bellezza e Benessere",
    description: "Centro estetico professionale a [Città]. Trattamenti viso, ceretta, massaggi e molto altro.",
    images: "/images/maria-estetista.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Centro Estetico [Nome]",
              "image": "https://[tuo-sito].it/images/maria-estetista.png",
              "url": "https://[tuo-sito].it",
              "telephone": "+39 [Numero Telefono]",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via [Nome Via] [Numero]",
                "addressLocality": "[Città]",
                "postalCode": "[CAP]",
                "addressCountry": "IT"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "priceRange": "€€"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
