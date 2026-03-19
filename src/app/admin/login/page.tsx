'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/marketplace')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FC' }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md" style={{ border: '1px solid #E8ECF4' }}>
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/images/geos-logo-new.jpg" alt="GEOS Enterprises" fill className="object-contain rounded-lg" />
          </div>
          <h1 className="font-heading font-bold text-2xl" style={{ color: '#12235A' }}>Admin Portal</h1>
          <p className="text-sm mt-1" style={{ color: '#334155' }}>GEOS Enterprises — Marketplace Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#12235A' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 text-sm"
              style={{ borderColor: '#E8ECF4', backgroundColor: '#F5F7FC' }}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#12235A' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 text-sm"
              style={{ borderColor: '#E8ECF4', backgroundColor: '#F5F7FC' }}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-center py-2 px-4 rounded-lg" style={{ backgroundColor: '#FDECEA', color: '#8E1B2D' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-heading font-bold text-white text-sm uppercase tracking-wide transition-colors"
            style={{ backgroundColor: loading ? '#aaa' : '#8E1B2D' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
