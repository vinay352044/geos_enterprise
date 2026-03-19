'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Box,
  InputAdornment,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Phone, CheckCircle, Send } from 'lucide-react'
import { leadFormSchema, type LeadFormData } from '@/lib/validators'
import { submitLeadApi } from '@/lib/api'
import { useAppSelector } from '@/store'
import { VEHICLE_CATEGORIES } from '@/lib/constants'
import { SectionHeading } from '@/components/ui/SectionHeading'

const VEHICLE_OPTIONS = VEHICLE_CATEGORIES.filter((c) => c !== 'All')

export function CallBasisForm() {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  // Prefill vehicle type from Redux
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

  if (submitSuccess) {
    return (
      <section id="call-basis-form" className="py-16 bg-navy">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12"
          >
            <CheckCircle size={64} className="text-success mx-auto mb-6" />
            <h2 className="font-heading font-bold text-navy text-3xl mb-4">Booking Received!</h2>
            <p className="font-body text-slate text-lg mb-8">{submitSuccess}</p>
            <Button
              variant="contained"
              onClick={() => setSubmitSuccess(null)}
              sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="call-basis-form" className="py-16 bg-navy" aria-label="Book a vehicle">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Book Now"
          title="Request a Vehicle — Call Basis"
          subtitle="Fill in your requirements and our team will call you back within 2 hours."
          className="[&_h2]:text-white [&_p]:text-blue-200 [&_p.font-heading]:text-blue-300"
        />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            maxWidth: '760px',
            mx: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            p: { xs: 3, md: 5 },
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Customer Name */}
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Name *"
                  fullWidth
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message}
                  autoComplete="name"
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
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <MenuItem key={v} value={v}>
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
                />
              )}
            />

            {/* Trip Start Date */}
            <Controller
              name="tripStartDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Trip Start Date *"
                  type="date"
                  fullWidth
                  inputProps={{ min: today }}
                  error={!!errors.tripStartDate}
                  helperText={errors.tripStartDate?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            {/* Trip End Date */}
            <Controller
              name="tripEndDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Trip End Date *"
                  type="date"
                  fullWidth
                  inputProps={{ min: today }}
                  error={!!errors.tripEndDate}
                  helperText={errors.tripEndDate?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            {/* Trip Start Time */}
            <Controller
              name="tripStartTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Time *"
                  type="time"
                  fullWidth
                  error={!!errors.tripStartTime}
                  helperText={errors.tripStartTime?.message || 'Pickup time'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                />
              )}
            />

            {/* Trip End Time */}
            <Controller
              name="tripEndTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="End Time *"
                  type="time"
                  fullWidth
                  error={!!errors.tripEndTime}
                  helperText={errors.tripEndTime?.message || 'Drop-off time'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                />
              )}
            />

            {/* Contact Number */}
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
                        <Phone size={16} className="text-slate" />
                        <span className="text-slate text-sm ml-1">+91</span>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Additional Notes */}
            <div className="md:col-span-2">
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
                    placeholder="Special requirements, number of passengers, luggage details..."
                    error={!!errors.additionalNotes}
                    helperText={errors.additionalNotes?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Error */}
          {submitError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {submitError}
            </Alert>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid || isSubmitting || submitMutation.isPending}
            endIcon={
              isSubmitting || submitMutation.isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Send size={18} />
              )
            }
            sx={{
              mt: 4,
              py: 1.75,
              fontSize: '16px',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              minHeight: '56px',
              backgroundColor: '#0D2B5E',
              '&:hover': { backgroundColor: '#081A3E' },
              '&:disabled': { backgroundColor: '#94a3b8' },
            }}
          >
            {isSubmitting || submitMutation.isPending ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </Box>
      </div>
    </section>
  )
}
