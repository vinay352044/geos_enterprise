'use client'

import { useState, FormEvent } from 'react'
import { Car, Calendar, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { VEHICLE_CATEGORIES } from '@/lib/constants'

const FEATURES = [
  { icon: Car, title: 'All vehicle categories', sub: 'Sedan, SUV, Minibus, Bus & more' },
  { icon: Calendar, title: 'Flexible contracts', sub: 'Daily, weekly, monthly terms' },
  { icon: MapPin, title: 'Pan-India coverage', sub: 'All major cities and highways' },
  { icon: Clock, title: '2-hour response time', sub: 'Our team calls you back fast' },
]

export function CallBasisForm() {
  const [form, setForm] = useState({
    name: '', vehicleType: '', pickup: '', drop: '',
    startDate: '', endDate: '', startTime: '', endTime: '',
    phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (submitted) {
    return (
      <section id="call-basis-form" style={{ background: '#fafaf8', padding: 'clamp(72px, 8vw, 120px) 0' }}>
        <div className="container-wide" style={{ maxWidth: '520px' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '56px 40px',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 24px 60px -20px rgba(10,15,28,0.08)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#f0fdf4',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 24px',
                color: '#1a7a42',
              }}
            >
              <CheckCircle size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, marginBottom: '12px', color: '#0a0f1c' }}>
              Booking received
            </h3>
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              Our fleet specialists will call you back within 2 hours with a tailored quote.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '12px 14px',
    border: '1px solid #e5e2dd',
    borderRadius: '10px',
    background: '#fafaf8',
    color: '#0a0f1c',
    outline: 'none',
    transition: 'all 0.2s',
  }

  return (
    <section
      id="call-basis-form"
      style={{ background: '#fafaf8', padding: 'clamp(72px, 8vw, 120px) 0' }}
    >
      <div className="container-wide">
        <div className="booking-grid-layout">
          {/* Left info */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#c8956c',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              Book Now
              <span style={{ display: 'block', width: '28px', height: '1.5px', background: 'currentColor', opacity: 0.5, borderRadius: '1px' }} />
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(30px, 3.4vw, 46px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#0a0f1c',
                marginBottom: '20px',
              }}
            >
              Request a vehicle
              <br />
              <span style={{ color: '#c8956c' }}>on call basis.</span>
            </h2>
            <p
              style={{
                fontSize: '15.5px',
                color: '#6b7280',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '460px',
              }}
            >
              Fill in your trip details and our fleet specialists will call you back within 2 hours
              with a tailored quote.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {FEATURES.map(({ icon: Icon, title, sub }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: '#f5f3f0',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#c8956c',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0f1c', marginBottom: '2px' }}>{title}</div>
                    <div style={{ fontSize: '12.5px', color: '#9ca3af' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: 'clamp(24px, 4vw, 32px)',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 24px 60px -20px rgba(10,15,28,0.08)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#0a0f1c', marginBottom: '4px' }}>
              Trip Details
            </h3>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>All fields marked * are required</p>

            <form onSubmit={submit}>
              <div className="field-grid-2">
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Your Name *</label>
                  <input type="text" required value={form.name} onChange={handle('name')} placeholder="Full name" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(10,15,28,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Vehicle Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Vehicle Type *</label>
                  <select required value={form.vehicleType} onChange={handle('vehicleType')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
                  >
                    <option value="">Select vehicle</option>
                    {VEHICLE_CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Pickup */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Pickup Location *</label>
                  <input type="text" required value={form.pickup} onChange={handle('pickup')} placeholder="City, landmark…" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(10,15,28,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Drop */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Drop Location *</label>
                  <input type="text" required value={form.drop} onChange={handle('drop')} placeholder="City, landmark…" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(10,15,28,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Start Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Start Date *</label>
                  <input type="date" required value={form.startDate} onChange={handle('startDate')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
                  />
                </div>

                {/* End Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>End Date *</label>
                  <input type="date" required value={form.endDate} onChange={handle('endDate')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
                  />
                </div>

                {/* Start Time */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Pickup Time *</label>
                  <input type="time" required value={form.startTime} onChange={handle('startTime')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
                  />
                </div>

                {/* End Time */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Drop-off Time *</label>
                  <input type="time" required value={form.endTime} onChange={handle('endTime')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
                  />
                </div>

                {/* Phone — full width */}
                <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Contact Number *</label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      border: '1px solid #e5e2dd',
                      borderRadius: '10px',
                      background: '#fafaf8',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        padding: '0 14px',
                        background: '#f5f3f0',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#2d3036',
                        borderRight: '1px solid #e5e2dd',
                        flexShrink: 0,
                      }}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={form.phone}
                      onChange={handle('phone')}
                      placeholder="10-digit mobile number"
                      style={{ ...inputStyle, border: 'none', borderRadius: 0, background: 'transparent', flex: 1 }}
                    />
                  </div>
                </div>

                {/* Notes — full width */}
                <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>Additional Notes</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={handle('notes')}
                    placeholder="Passenger count, luggage, special requirements…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '84px' }}
                    onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(10,15,28,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '24px',
                  background: loading ? '#6b7280' : '#0a0f1c',
                  color: '#fff',
                  padding: '16px',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1a2332' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0a0f1c' }}
              >
                {loading ? 'Submitting…' : 'Submit Booking Request'}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .booking-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        .field-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .field-grid-2 { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .booking-grid-layout { grid-template-columns: 1fr 1.1fr; gap: 80px; }
        }
      `}</style>
    </section>
  )
}
