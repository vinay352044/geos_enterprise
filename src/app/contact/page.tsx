'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators'
import { submitContactApi } from '@/lib/api'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { companyInfo } from '@/data/companyInfo'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
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
      <section className="bg-navy py-12 pt-16 md:py-20 md:pt-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-heading font-bold text-white mb-4">Contact Us</h1>
          <p className="font-body text-blue-100 text-lg max-w-xl mx-auto">
            Get in touch with our fleet specialists for quotes, partnerships, or any inquiries.
          </p>
        </div>
      </section>

      <section className="py-16 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  value: companyInfo.phone,
                  href: `tel:${companyInfo.phone.replace(/\D/g, '')}`,
                  sub: 'Mon–Sun, 24/7',
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
                  sub: 'Gurugram, Haryana',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 3 }}>
                      <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-navy text-sm">{item.title}</p>
                        <a href={item.href} className="font-body text-slate text-sm hover:text-accent transition-colors">
                          {item.value}
                        </a>
                        <p className="text-xs text-slate/60 mt-0.5">{item.sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Map */}
              <div id="map" className="rounded-xl overflow-hidden h-48 bg-gray-200">
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
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card>
                  <CardContent sx={{ p: 6, textAlign: 'center' }}>
                    <CheckCircle size={56} className="text-success mx-auto mb-4" />
                    <h2 className="font-heading font-bold text-navy text-2xl mb-3">
                      Message Sent!
                    </h2>
                    <p className="font-body text-slate mb-6">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outlined"
                      onClick={() => setSubmitted(false)}
                      sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <SectionHeading
                      label="Get in Touch"
                      title="Send Us a Message"
                      align="left"
                      className="mb-6"
                    />

                    <Box
                      component="form"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
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
                              />
                            )}
                          />
                        </div>
                      </div>

                      {mutation.isError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          Failed to send. Please email us at {companyInfo.email}
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={mutation.isPending}
                        endIcon={mutation.isPending ? <CircularProgress size={18} color="inherit" /> : <Send size={18} />}
                        sx={{
                          mt: 3,
                          py: 1.75,
                          fontFamily: '"Montserrat", sans-serif',
                          fontWeight: 700,
                          fontSize: '16px',
                          textTransform: 'uppercase',
                          backgroundColor: '#0D2B5E',
                          '&:hover': { backgroundColor: '#081A3E' },
                        }}
                      >
                        {mutation.isPending ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
