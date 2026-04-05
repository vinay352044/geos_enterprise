'use client'

import React, { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

/**
 * Holographic Card — 3D tilt + cursor-tracked radial glow + diagonal
 * holographic sheen. Adapted from the Aceternity/21st.dev pattern.
 *
 * This is a transparent wrapper: it renders `children` verbatim and
 * only adds the interactive effects on top. The consumer keeps full
 * control over the card's actual content, padding, and colors.
 *
 * Visual layers (all driven by CSS custom properties set from JS):
 * - `transform: perspective(1000px) rotateX/Y` — 3D tilt
 * - `::before` — radial glow at cursor position (--x, --y)
 * - `::after`  — diagonal sheen that shifts with the cursor (--bg-x, --bg-y)
 *
 * Styling lives in `globals.css` under `.holo-card`.
 */
export function HolographicCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Gentle tilt — divide by 20 instead of 10 for a more premium,
    // restrained motion that suits a corporate brand.
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--x', '50%')
    card.style.setProperty('--y', '50%')
    card.style.setProperty('--bg-x', '50%')
    card.style.setProperty('--bg-y', '50%')
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn('holo-card', className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
