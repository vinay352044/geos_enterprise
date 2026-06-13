'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { companyInfo } from '@/data/companyInfo'

type Message = { from: 'bot' | 'user'; text: string }

const QUICK_REPLIES = ['Book a vehicle', 'See pricing', 'Fleet available?']

function getBotReply(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('price') || t.includes('cost') || t.includes('rate'))
    return 'Pricing depends on vehicle type, contract length, and route. Share your trip details and we\'ll send a tailored quote within 2 hours.'
  if (t.includes('book') || t.includes('rent'))
    return 'You can book a vehicle via our booking form, or WhatsApp us at +91-92274-76900. Which vehicle category — Sedan, SUV, Minibus, Bus?'
  if (t.includes('available') || t.includes('fleet'))
    return 'We operate Sedans, SUVs, Luxury SUVs, Tempo Travellers, Minibuses and Buses — 500+ vehicles, all 100% taxi-plated.'
  if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
    return 'Hi there! Tell me what you\'re looking for — vehicle on rent, contract hire, or a used vehicle from our marketplace?'
  return 'Got it — one of our fleet specialists will reach out shortly. You can also book directly via the form or call us 24×7.'
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hello from GEOS 👋 How can we help you today?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages(m => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'bot', text: getBotReply(text) }])
    }, 900)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '96px',
        right: '24px',
        width: '340px',
        maxWidth: 'calc(100vw - 48px)',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 24px 60px -16px rgba(0,0,0,0.3)',
        zIndex: 70,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)',
        transformOrigin: 'bottom right',
        animation: 'chat-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      role="dialog"
      aria-label="GEOS chat"
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%)',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fff',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#c8956c',
            display: 'grid',
            placeItems: 'center',
            color: '#0a0f1c',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '16px',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          G
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #0a0f1c',
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px' }}>
            GEOS Support
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.55)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '2px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            Online · Replies in minutes
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
          }}
          aria-label="Close chat"
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#fafaf8',
          minHeight: '260px',
          maxHeight: '360px',
          overflowY: 'auto',
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '8px',
              maxWidth: '85%',
              alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: m.from === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                borderRadius: m.from === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                fontSize: '13.5px',
                lineHeight: 1.5,
                background: m.from === 'user' ? '#0a0f1c' : '#fff',
                color: m.from === 'user' ? '#fff' : '#2d3036',
                border: m.from === 'user' ? 'none' : '1px solid #e5e2dd',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px' }}>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '4px 14px 14px 14px',
                background: '#fff',
                border: '1px solid #e5e2dd',
              }}
            >
              <span className="typing-dots">
                <span /><span /><span />
              </span>
            </div>
          </div>
        )}

        {messages.length === 1 && !typing && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: '#fff',
                  border: '1px solid #e5e2dd',
                  color: '#0a0f1c',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a0f1c'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0a0f1c' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a0f1c'; e.currentTarget.style.borderColor = '#e5e2dd' }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px',
          borderTop: '1px solid #e5e2dd',
          background: '#fff',
        }}
        onSubmit={(e) => { e.preventDefault(); send(input) }}
      >
        <input
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            border: '1px solid #e5e2dd',
            borderRadius: '999px',
            padding: '9px 14px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            background: '#fafaf8',
            outline: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = '#0a0f1c'; e.target.style.background = '#fff' }}
          onBlur={e => { e.target.style.borderColor = '#e5e2dd'; e.target.style.background = '#fafaf8' }}
        />
        <button
          type="submit"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#0a0f1c',
            border: 'none',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            color: '#fff',
          }}
          aria-label="Send"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  )
}

export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false)

  const waUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Hi GEOS, I want to enquire about your fleet.')}`

  return (
    <>
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}

      {/* Chat FAB */}
      <button
        onClick={() => setChatOpen(v => !v)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '92px',
          zIndex: 60,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          boxShadow: '0 14px 32px -10px rgba(0,0,0,0.35)',
          cursor: 'pointer',
          transition: 'transform 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {chatOpen ? <X size={20} /> : <MessageCircle size={22} />}
      </button>

      {/* WhatsApp FAB */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 60,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25d366',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          boxShadow: '0 14px 32px -10px rgba(0,0,0,0.35)',
          textDecoration: 'none',
          transition: 'transform 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {/* Pulse ring */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: '#25d366',
            opacity: 0.4,
            animation: 'wa-pulse 2s ease-out infinite',
            pointerEvents: 'none',
          }}
        />
        {/* WhatsApp icon SVG */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{`
        @keyframes chat-pop {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wa-pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .typing-dots { display: inline-flex; gap: 3px; padding: 4px 0; }
        .typing-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #9ca3af;
          animation: typing 1.2s infinite ease-in-out;
          display: inline-block;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typing {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}
