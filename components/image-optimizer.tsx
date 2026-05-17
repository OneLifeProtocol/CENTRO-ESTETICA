"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onError?: (e: any) => void
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!imageRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(imageRef)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(imageRef)

    return () => {
      if (imageRef) observer.unobserve(imageRef)
    }
  }, [imageRef])

  return (
    <div
      ref={setImageRef}
      className={`relative ${className}`}
      style={{ height: fill ? "100%" : height ? `${height}px` : "auto" }}
    >
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
          onError={onError}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  )
}
