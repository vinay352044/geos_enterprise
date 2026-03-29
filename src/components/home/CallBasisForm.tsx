'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { TextField, MenuItem, CircularProgress, InputAdornment } from '@mui/material'
import { motion } from 'framer-motion'
import { Phone, CheckCircle, Send, Calendar, MapPin, Car, Clock } from 'lucide-react'
import { leadFormSchema, type LeadFormData } from '@/lib/validators'
import { submitLeadApi } from '@/lib/api'
import { useAppSelector } from '@/store'
import { VEHICLE_CATEGORIES } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'

const VEHICLE_OPTIONS = VEHICLE_CATEGORIES.filter((c) => c !== 'All')

export function CallBasisForm() {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { ref, inView } = useInView(0.1)
  const prefilledVehicle = useAppSelector((s) => s.form.prefilledVehicleType)
  const today = new Date().toISOString().split('T')[0]

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      customerName: '',
      pickupLocation: '',
      dropLocation: '',
      tripStartDate: '',
      tripEndDate: '',
      tripStartTime: '',
      tripEndTime: '',
      vehicleType: undefined,
      contactNumber: '',
      additionalNotes: '',
    },
  })

  useEffect(() => {
    if (prefilledVehicle) {
      setValue('vehicleType', prefilledVehicle as LeadFormData['vehicleType'])
    }
  }, [prefilledVehicle, setValue])

  const submitMutation = useMutation({
    mutationFn: submitLeadApi,
    onSuccess: (data) => {
      if (data.success && data.data) {
        setSubmitSuccess(data.data.message)
        reset()
      } else {
        setSubmitError(data.error || 'Something went wrong. Please call us at +91-92274-76900.')
      }
    },
    onError: () => {
      setSubmitError('Something went wrong. Please call us at +91-92274-76900 or try again.')
    },
  })

  const onSubmit = (data: LeadFormData) => {
    setSubmitError(null)
    submitMutation.mutate(data as unknown as Record<string, unknown>)
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      fontFamily: '"Inter", sans-serif',
      fontSize: '14px',
      borderRadius: '10px',
      backgroundColor: 'rgba(248,250,255,0.8)',
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
    '& .MuiFormHelperText-root': {
      fontFamily: '"Inter", sans-serif',
      fontSize: '12px',
    },
  }

  // Success state
  if (submitSuccess) {
    return (
      <section id="call-basis-form" className="section-py" style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #060E1E 100%)' }}>
        <div className="container-wide max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-12"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(22,101,52,0.1)', border: '1px solid rgba(22,101,52,0.2)' }}
            >
              <CheckCircle size={32} style={{ color: '#166534' }} />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3" style={{ color: '#0D1B3E' }}>
              Booking Received!
            </h2>
            <p className="font-body text-base mb-8 leading-relaxed" style={{ color: '#475569' }}>
              {submitSuccess}
            </p>
            <button
              onClick={() => setSubmitSuccess(null)}
              className="font-heading font-bold text-sm uppercase tracking-wider text-white px-8 py-3 rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)' }}
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="call-basis-form"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-py"
      aria-label="Book a vehicle"
      style={{ background: 'linear-gradient(180deg, #060E1E 0%, #0D1B3E 50%, #060E1E 100%)' }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Info side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2"
          >
            <span className="section-label mb-6 inline-flex" style={{ color: '#F0A500', '--tw-ring-color': '#F0A500' } as React.CSSProperties}>
              BOOK NOW
            </span>

            <h2
              className="font-heading font-extrabold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.02em' }}
            >
              Request a Vehicle{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #F0A500 0%, #FCD34D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                on Call Basis.
              </span>
            </h2>

            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Fill in your trip details and our fleet specialists will call you back within 2 hours with a tailored quote.
            </p>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { icon: Car, title: 'All vehicle categories', sub: 'Sedan, SUV, Minibus, Bus & more' },
                { icon: Calendar, title: 'Short & long-term rentals', sub: 'Daily, weekly, monthly contracts' },
                { icon: MapPin, title: 'Pan-India coverage', sub: 'All major cities and highways' },
                { icon: Clock, title: 'Response within 2 hours', sub: 'Our team calls you back fast' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}
                    >
                      <Icon size={17} style={{ color: '#60A5FA' }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-white text-sm">{item.title}</p>
                      <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="bg-white rounded-2xl p-7 md:p-9"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.35)' }}
            >
              <h3 className="font-heading font-bold text-lg mb-6" style={{ color: '#0D1B3E' }}>
                Trip Details
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Customer Name */}
                  <Controller
                    name="customerName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Your Name *"
                        fullWidth
                        error={!!errors.customerName}
                        helperText={errors.customerName?.message}
                        autoComplete="name"
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* Vehicle Type */}
                  <Controller
                    name="vehicleType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        select
                        label="Vehicle Type *"
                        fullWidth
                        error={!!errors.vehicleType}
                        helperText={errors.vehicleType?.message}
                        sx={inputSx}
                      >
                        {VEHICLE_OPTIONS.map((v) => (
                          <MenuItem key={v} value={v} sx={{ fontFamily: '"Inter", sans-serif', fontSize: '14px' }}>
                            {v}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  {/* Pickup */}
                  <Controller
                    name="pickupLocation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pickup Location *"
                        fullWidth
                        placeholder="City, landmark, or address"
                        error={!!errors.pickupLocation}
                        helperText={errors.pickupLocation?.message}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* Drop */}
                  <Controller
                    name="dropLocation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Drop Location *"
                        fullWidth
                        placeholder="City, landmark, or address"
                        error={!!errors.dropLocation}
                        helperText={errors.dropLocation?.message}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* Start Date */}
                  <Controller
                    name="tripStartDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Start Date *"
                        type="date"
                        fullWidth
                        inputProps={{ min: today }}
                        error={!!errors.tripStartDate}
                        helperText={errors.tripStartDate?.message}
                        InputLabelProps={{ shrink: true }}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* End Date */}
                  <Controller
                    name="tripEndDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="End Date *"
                        type="date"
                        fullWidth
                        inputProps={{ min: today }}
                        error={!!errors.tripEndDate}
                        helperText={errors.tripEndDate?.message}
                        InputLabelProps={{ shrink: true }}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* Start Time */}
                  <Controller
                    name="tripStartTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pickup Time *"
                        type="time"
                        fullWidth
                        error={!!errors.tripStartTime}
                        helperText={errors.tripStartTime?.message || 'Trip start time'}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* End Time */}
                  <Controller
                    name="tripEndTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Drop-off Time *"
                        type="time"
                        fullWidth
                        error={!!errors.tripEndTime}
                        helperText={errors.tripEndTime?.message || 'Trip end time'}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                        sx={inputSx}
                      />
                    )}
                  />

                  {/* Contact Number */}
                  <div className="sm:col-span-2">
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Contact Number *"
                          fullWidth
                          placeholder="10-digit mobile number"
                          inputProps={{ maxLength: 10 }}
                          error={!!errors.contactNumber}
                          helperText={errors.contactNumber?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone size={15} style={{ color: '#64748B' }} />
                                <span className="font-body text-sm ml-1.5" style={{ color: '#64748B' }}>+91</span>
                              </InputAdornment>
                            ),
                          }}
                          sx={inputSx}
                        />
                      )}
                    />
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <Controller
                      name="additionalNotes"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Additional Notes"
                          multiline
                          rows={3}
                          fullWidth
                          placeholder="Passenger count, luggage, special requirements..."
                          error={!!errors.additionalNotes}
                          helperText={errors.additionalNotes?.message}
                          sx={inputSx}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Error */}
                {submitError && (
                  <div
                    className="mt-4 flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: 'rgba(153,27,27,0.08)', border: '1px solid rgba(153,27,27,0.2)' }}
                  >
                    <span className="font-body text-sm" style={{ color: '#991B1B' }}>{submitError}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting || submitMutation.isPending}
                  className="w-full mt-6 flex items-center justify-center gap-2.5 font-heading font-bold text-[13px] uppercase tracking-wider text-white py-4 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: isValid
                      ? 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)'
                      : 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                    boxShadow: isValid ? '0 4px 20px rgba(13,27,62,0.35)' : 'none',
                    minHeight: '52px',
                  }}
                >
                  {isSubmitting || submitMutation.isPending ? (
                    <>
                      <CircularProgress size={16} sx={{ color: '#ffffff' }} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Booking Request
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
