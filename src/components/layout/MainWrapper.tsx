'use client'

import { usePathname } from 'next/navigation'

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  // Hero sections handle their own top padding; non-hero pages need navbar offset
  return (
    <main className={isAdmin ? '' : ''}>
      {children}
    </main>
  )
}
