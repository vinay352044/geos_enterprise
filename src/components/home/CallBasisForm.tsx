'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { TextField, MenuItem, CircularProgress, InputAdornment } from '@mui/material'
import { motion } from 'framer-motion'
import { Phone, CheckCircle, Send, Calendar, MapPin, Car, Clock, ArrowRight } from 'lucide-react'
import { leadFormSchema, type LeadFormData } from '@/lib/validators'
import { submitLeadApi } from '@/lib/api'
import { useAppSelector } from '@/store'
import { VEHICLE_CATEGORIES } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'

const VEHICLE_OPTIONS = VEHICLE_CATEGORIES.filter((c) => c !== 'All')
const ease = [0.25, 1, 0.5, 1] as const

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
    '& .MuiFormHelperText-root': {
      fontFamily: '"Inter", sans-serif',
      fontSize: '12px',
    },
  }

  // Success state
  if (submitSuccess) {
    return (
      <section id="call-basis-form" className="section-py" style={{ background: '#fafaf8' }}>
        <div className="container-wide max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
            className="bg-white rounded-2xl p-12 border border-black/[0.04]"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#f0fdf4' }}
            >
              <CheckCircle size={28} style={{ color: '#1a7a42' }} strokeWidth={1.5} />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3" style={{ color: '#0a0f1c' }}>
              Booking Received
            </h2>
            <p className="font-body text-sm mb-8 leading-relaxed" style={{ color: '#6b7280' }}>
              {submitSuccess}
            </p>
            <button
              onClick={() => setSubmitSuccess(null)}
              className="font-heading font-semibold text-sm text-white bg-[#0a0f1c] px-7 py-3 rounded-lg hover:bg-[#1a2332] transition-colors"
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
      style={{ background: '#fafaf8' }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Info side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="lg:sticky lg:top-32"
          >
            <span className="section-label mb-6 inline-flex" style={{ color: '#c8956c' }}>
              BOOK NOW
            </span>

            <h2
              className="font-heading font-extrabold mb-5"
              style={{
                color: '#0a0f1c',
                fontSize: 'clamp(28px, 3vw, 42px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Request a vehicle
              <br />
              <span style={{ color: '#c8956c' }}>on call basis.</span>
            </h2>

            <p className="font-body text-base leading-relaxed mb-10" style={{ color: '#6b7280' }}>
              Fill in your trip details and our fleet specialists will call you back within 2 hours with a tailored quote.
            </p>

            {/* Features — clean list */}
            <div className="space-y-5">
              {[
                { icon: Car, title: 'All vehicle categories', sub: 'Sedan, SUV, Minibus, Bus & more' },
                { icon: Calendar, title: 'Flexible contracts', sub: 'Daily, weekly, monthly terms' },
                { icon: MapPin, title: 'Pan-India coverage', sub: 'All major cities and highways' },
                { icon: Clock, title: '2-hour response time', sub: 'Our team calls you back fast' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f5f3f0]">
                      <Icon size={16} style={{ color: '#6b7280' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-body font-medium text-sm text-[#0a0f1c]">{item.title}</p>
                      <p className="font-body text-xs text-[#9ca3af] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div
              className="bg-white rounded-2xl p-7 md:p-9 border border-black/[0.04]"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-heading font-bold text-lg mb-1" style={{ color: '#0a0f1c' }}>
                Trip Details
              </h3>
              <p className="font-body text-xs text-[#9ca3af] mb-6">All fields marked * are required</p>

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
                                <Phone size={14} style={{ color: '#9ca3af' }} strokeWidth={1.5} />
                                <span className="font-body text-sm ml-1.5" style={{ color: '#9ca3af' }}>+91</span>
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
                    style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
                  >
                    <span className="font-body text-sm" style={{ color: '#c23a22' }}>{submitError}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting || submitMutation.isPending}
                  className="w-full mt-6 flex items-center justify-center gap-2.5 font-heading font-semibold text-[14px] text-white py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isValid ? '#0a0f1c' : '#9ca3af',
                    minHeight: '52px',
                  }}
                  onMouseEnter={(e) => {
                    if (isValid) e.currentTarget.style.background = '#1a2332'
                  }}
                  onMouseLeave={(e) => {
                    if (isValid) e.currentTarget.style.background = '#0a0f1c'
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
                      <ArrowRight size={15} strokeWidth={2} />
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
