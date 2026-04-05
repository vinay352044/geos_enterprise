'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Infinite Moving Cards — adapted from Aceternity UI.
 *
 * Generic over an item type `T`. Consumers pass their own `renderItem`
 * so the visual design of the cards stays under their control while
 * this component handles the infinite scroll logic (clone-on-mount +
 * CSS keyframe scroll).
 */
export function InfiniteMovingCards<T>({
  items,
  renderItem,
  getKey,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey: (item: T, index: number) => string
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current
    if (!container || !scroller) return

    // Clone the original children so the scroll loops seamlessly.
    // Track originals explicitly so we can clean them up on unmount/re-run.
    const originals = Array.from(scroller.children)
    const clones: Element[] = []
    originals.forEach((item) => {
      const dup = item.cloneNode(true) as HTMLElement
      // Hide clones from assistive tech to avoid duplicate announcements.
      dup.setAttribute('aria-hidden', 'true')
      dup.dataset.cloned = 'true'
      scroller.appendChild(dup)
      clones.push(dup)
    })

    // Set direction + speed as CSS custom properties so the keyframe
    // animation in globals.css can read them.
    container.style.setProperty(
      '--animation-direction',
      direction === 'left' ? 'forwards' : 'reverse',
    )
    const durationMap = { fast: '30s', normal: '60s', slow: '90s' } as const
    container.style.setProperty('--animation-duration', durationMap[speed])

    // Start the animation by adding the class imperatively — avoids
    // a setState-in-effect cascade render.
    scroller.classList.add('animate-scroll')

    return () => {
      scroller.classList.remove('animate-scroll')
      clones.forEach((c) => {
        if (c.parentNode === scroller) scroller.removeChild(c)
      })
    }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <li
            key={getKey(item, idx)}
            className={cn('shrink-0', itemClassName)}
          >
            {renderItem(item, idx)}
          </li>
        ))}
      </ul>
    </div>
  )
}
