import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-heading font-bold text-navy/10 mb-4 leading-none">404</div>
        <h1 className="font-heading font-bold text-navy text-4xl mb-4">Page Not Found</h1>
        <p className="font-body text-slate text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy text-white font-heading font-bold text-sm uppercase tracking-wide px-8 py-3 rounded hover:bg-navy-700 transition-colors min-h-[48px]"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 border-2 border-navy text-navy font-heading font-bold text-sm uppercase tracking-wide px-8 py-3 rounded hover:bg-navy/5 transition-colors min-h-[48px]"
          >
            <ArrowLeft size={18} />
            View Marketplace
          </Link>
        </div>
      </div>
    </div>
  )
}
