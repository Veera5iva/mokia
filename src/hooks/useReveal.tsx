"use client"
import { useState, useEffect, useRef } from "react"

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Don't unobserve immediately to allow for re-triggering if needed
            // observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1, // Lower threshold for better triggering
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return { ref, isVisible }
}