'use client'

import { useState, useEffect, useRef } from 'react'

export function useCountUp(
  target: number,
  duration: number = 2000,
  inView: boolean = false,
): number {
  const [count, setCount] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = Date.now()
    const step = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }
    animationRef.current = requestAnimationFrame(step)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [target, duration, inView])

  return count
}
