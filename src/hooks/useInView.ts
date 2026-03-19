'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1,
): { ref: RefObject<T | null>; inView: boolean } {
  const [inView, setInView] = useState(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
