import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="font-heading font-extrabold leading-none mb-6 select-none"
          style={{ fontSize: 'clamp(80px, 15vw, 140px)', color: 'rgba(10,15,28,0.04)', letterSpacing: '-0.04em' }}
        >
          404
        </div>
        <h1
          className="font-heading font-bold text-2xl mb-3"
          style={{ color: '#0a0f1c', letterSpacing: '-0.02em' }}
        >
          Page not found
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: '#6b7280' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0a0f1c] text-white font-heading font-semibold text-[13px] px-6 py-3 rounded-lg hover:bg-[#1a2332] transition-colors"
          >
            Go Home
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 border border-[#e5e2dd] text-[#0a0f1c] font-heading font-semibold text-[13px] px-6 py-3 rounded-lg hover:bg-[#f5f3f0] transition-colors"
          >
            View Marketplace
          </Link>
        </div>
      </div>
    </div>
  )
}
