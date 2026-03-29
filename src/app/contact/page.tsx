'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { TextField, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle, Send, MessageSquare } from 'lucide-react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators'
import { submitContactApi } from '@/lib/api'
import { companyInfo } from '@/data/companyInfo'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    borderRadius: '10px',
    backgroundColor: '#F9FAFB',
    '& fieldset': { borderColor: '#E2E8F0', borderWidth: '1.5px' },
    '&:hover fieldset': { borderColor: '#2563EB55' },
    '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    color: '#64748B',
    '&.Mui-focused': { color: '#2563EB' },
  },
  '& .MuiFormHelperText-root': { fontFamily: '"Inter", sans-serif', fontSize: '12px' },
}

const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    value: companyInfo.phone,
    href: `tel:${companyInfo.phone.replace(/\D/g, '')}`,
    sub: 'Available 24/7',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    sub: 'Reply within 24 hours',
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.15)',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: companyInfo.address.full,
    href: '#map',
    sub: 'Ahmedabad, Gujarat',
    iconColor: '#F0A500',
    iconBg: 'rgba(240,165,0,0.1)',
    border: 'rgba(240,165,0,0.15)',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  })

  const mutation = useMutation({
    mutationFn: submitContactApi,
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true)
        reset()
      }
    },
  })

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data as unknown as Record<string, unknown>)
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #040B18 0%, #0A1830 40%, #0C1F4A 70%, #060E1A 100%)',
          paddingTop: 'clamp(100px, 12vw, 160px)',
          paddingBottom: 'clamp(56px, 6vw, 88px)',
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: '700px', height: '700px', top: '-200px', right: '-100px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container-wide relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 font-heading font-bold text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(37,99,235,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <MessageSquare size={11} />
              GET IN TOUCH
            </span>
            <h1 className="font-heading font-extrabold text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
              Contact Us
            </h1>
            <p className="font-body text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Get in touch with our fleet specialists for quotes, partnerships, or any inquiries. We respond within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="section-py" style={{ backgroundColor: '#F5F8FF' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — Info */}
            <div className="space-y-4">
              {contactCards.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white group transition-all duration-300"
                    style={{
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 16px rgba(13,27,62,0.06)',
                      display: 'flex',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = item.border
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(13,27,62,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(13,27,62,0.06)'
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.iconBg, border: `1px solid ${item.border}` }}
                    >
                      <Icon size={18} style={{ color: item.iconColor }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm mb-1" style={{ color: '#0D1B3E' }}>{item.title}</p>
                      <p className="font-body text-sm group-hover:underline transition-all" style={{ color: '#334155' }}>
                        {item.value}
                      </p>
                      <p className="font-body text-xs mt-0.5" style={{ color: '#94A3B8' }}>{item.sub}</p>
                    </div>
                  </motion.a>
                )
              })}

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                id="map"
                className="rounded-2xl overflow-hidden bg-gray-200"
                style={{ height: '200px', border: '1px solid #E2E8F0' }}
              >
                <iframe
                  src={companyInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GEOS Enterprises location map"
                />
              </motion.div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-7 md:p-9"
                style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(13,27,62,0.07)' }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: 'rgba(22,101,52,0.08)', border: '1px solid rgba(22,101,52,0.2)' }}
                    >
                      <CheckCircle size={32} style={{ color: '#166534' }} />
                    </div>
                    <h2 className="font-heading font-bold text-2xl mb-3" style={{ color: '#0D1B3E' }}>
                      Message Sent!
                    </h2>
                    <p className="font-body mb-8" style={{ color: '#475569' }}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-heading font-bold text-[13px] uppercase tracking-wider px-8 py-3 rounded-xl border-2 transition-all hover:bg-slate-50"
                      style={{ borderColor: '#E2E8F0', color: '#0D1B3E' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h2 className="font-heading font-bold text-2xl mb-1" style={{ color: '#0D1B3E' }}>
                        Send Us a Message
                      </h2>
                      <p className="font-body text-sm" style={{ color: '#64748B' }}>
                        Our fleet specialists will respond within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Your Name *"
                              fullWidth
                              error={!!errors.name}
                              helperText={errors.name?.message}
                              sx={inputSx}
                            />
                          )}
                        />
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Email Address *"
                              type="email"
                              fullWidth
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              sx={inputSx}
                            />
                          )}
                        />
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Mobile Number *"
                              fullWidth
                              placeholder="10-digit number"
                              inputProps={{ maxLength: 10 }}
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                              sx={inputSx}
                            />
                          )}
                        />
                        <Controller
                          name="subject"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Subject *"
                              fullWidth
                              error={!!errors.subject}
                              helperText={errors.subject?.message}
                              sx={inputSx}
                            />
                          )}
                        />
                        <div className="md:col-span-2">
                          <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Message *"
                                multiline
                                rows={5}
                                fullWidth
                                error={!!errors.message}
                                helperText={errors.message?.message}
                                sx={inputSx}
                              />
                            )}
                          />
                        </div>
                      </div>

                      {mutation.isError && (
                        <div
                          className="mt-4 p-4 rounded-xl"
                          style={{ backgroundColor: 'rgba(153,27,27,0.08)', border: '1px solid rgba(153,27,27,0.2)' }}
                        >
                          <p className="font-body text-sm" style={{ color: '#991B1B' }}>
                            Failed to send. Please email us at {companyInfo.email}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={mutation.isPending || !isValid}
                        className="w-full mt-6 flex items-center justify-center gap-2.5 font-heading font-bold text-[13px] uppercase tracking-wider text-white py-4 rounded-xl transition-all duration-300 disabled:opacity-60"
                        style={{
                          background: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)',
                          boxShadow: '0 4px 20px rgba(13,27,62,0.3)',
                          minHeight: '52px',
                        }}
                      >
                        {mutation.isPending ? (
                          <>
                            <CircularProgress size={16} sx={{ color: '#ffffff' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={15} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
