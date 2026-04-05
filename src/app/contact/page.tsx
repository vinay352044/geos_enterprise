'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { TextField, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle, Send, ArrowRight } from 'lucide-react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators'
import { submitContactApi } from '@/lib/api'
import { companyInfo } from '@/data/companyInfo'

const ease = [0.25, 1, 0.5, 1] as const

const inputSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    borderRadius: '10px',
    backgroundColor: '#fafaf8',
    '& fieldset': { borderColor: '#e5e2dd', borderWidth: '1px' },
    '&:hover fieldset': { borderColor: '#c8956c55' },
    '&.Mui-focused fieldset': { borderColor: '#0a0f1c', borderWidth: '1.5px' },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    color: '#9ca3af',
    '&.Mui-focused': { color: '#0a0f1c' },
  },
  '& .MuiFormHelperText-root': { fontFamily: '"Inter", sans-serif', fontSize: '12px' },
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    value: companyInfo.phone,
    href: `tel:${companyInfo.phone.replace(/\D/g, '')}`,
    sub: 'Available 24/7',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    sub: 'Reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: companyInfo.address.full,
    href: '#map',
    sub: 'Ahmedabad, Gujarat',
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
          background: '#0a0f1c',
          paddingTop: 'clamp(120px, 14vw, 180px)',
          paddingBottom: 'clamp(56px, 6vw, 88px)',
        }}
      >
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#3366ff]" />
              <span className="font-body text-[12px] font-medium tracking-[0.15em] uppercase text-[#3366ff]">
                Get in Touch
              </span>
            </div>
            <h1
              className="font-heading font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
            >
              Contact Us
            </h1>
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Get in touch with our fleet specialists for quotes, partnerships, or any inquiries. We respond within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="section-py bg-[#fafaf8]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left — Info */}
            <div className="space-y-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08, ease }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white group transition-all duration-300 border border-black/[0.04] hover:border-black/[0.08] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                    style={{ display: 'flex' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f5f3f0]">
                      <Icon size={15} style={{ color: '#6b7280' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-body font-medium text-sm mb-0.5" style={{ color: '#0a0f1c' }}>{item.title}</p>
                      <p className="font-body text-sm group-hover:text-[#0a0f1c] transition-colors" style={{ color: '#6b7280' }}>
                        {item.value}
                      </p>
                      <p className="font-body text-[11px] text-[#9ca3af] mt-0.5">{item.sub}</p>
                    </div>
                  </motion.a>
                )
              })}

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease }}
                id="map"
                className="rounded-xl overflow-hidden bg-[#f5f3f0]"
                style={{ height: '200px', border: '1px solid rgba(0,0,0,0.04)' }}
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="bg-white rounded-2xl p-7 md:p-9 border border-black/[0.04]"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 bg-[#f0fdf4]">
                      <CheckCircle size={28} style={{ color: '#1a7a42' }} strokeWidth={1.5} />
                    </div>
                    <h2 className="font-heading font-bold text-2xl mb-3" style={{ color: '#0a0f1c' }}>
                      Message Sent
                    </h2>
                    <p className="font-body text-sm mb-8" style={{ color: '#6b7280' }}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-heading font-semibold text-sm text-[#0a0f1c] px-7 py-3 rounded-lg border border-[#e5e2dd] hover:bg-[#f5f3f0] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h2 className="font-heading font-bold text-xl mb-1" style={{ color: '#0a0f1c' }}>
                        Send us a message
                      </h2>
                      <p className="font-body text-sm" style={{ color: '#9ca3af' }}>
                        Our fleet specialists will respond within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Your Name *" fullWidth error={!!errors.name} helperText={errors.name?.message} sx={inputSx} />
                          )}
                        />
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Email Address *" type="email" fullWidth error={!!errors.email} helperText={errors.email?.message} sx={inputSx} />
                          )}
                        />
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Mobile Number *" fullWidth placeholder="10-digit number" inputProps={{ maxLength: 10 }} error={!!errors.phone} helperText={errors.phone?.message} sx={inputSx} />
                          )}
                        />
                        <Controller
                          name="subject"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Subject *" fullWidth error={!!errors.subject} helperText={errors.subject?.message} sx={inputSx} />
                          )}
                        />
                        <div className="md:col-span-2">
                          <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                              <TextField {...field} label="Message *" multiline rows={5} fullWidth error={!!errors.message} helperText={errors.message?.message} sx={inputSx} />
                            )}
                          />
                        </div>
                      </div>

                      {mutation.isError && (
                        <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                          <p className="font-body text-sm" style={{ color: '#c23a22' }}>
                            Failed to send. Please email us at {companyInfo.email}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={mutation.isPending || !isValid}
                        className="w-full mt-6 flex items-center justify-center gap-2.5 font-heading font-semibold text-[14px] text-white py-4 rounded-xl transition-all duration-300 disabled:opacity-50"
                        style={{
                          background: isValid ? '#0a0f1c' : '#9ca3af',
                          minHeight: '52px',
                        }}
                        onMouseEnter={(e) => { if (isValid) e.currentTarget.style.background = '#1a2332' }}
                        onMouseLeave={(e) => { if (isValid) e.currentTarget.style.background = '#0a0f1c' }}
                      >
                        {mutation.isPending ? (
                          <>
                            <CircularProgress size={16} sx={{ color: '#ffffff' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight size={15} strokeWidth={2} />
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
