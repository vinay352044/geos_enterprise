'use client'

import { useState, useEffect, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  otpSent,
  otpVerified,
  otpAttemptFailed,
  resetOtp,
  setCooldown,
} from '@/store/slices/formSlice'
import { sendOtpApi, verifyOtpApi } from '@/lib/api'

const COOLDOWN_SECONDS = 60

export function useOtp() {
  const dispatch = useAppDispatch()
  const otpState = useAppSelector((s) => s.form.otp)
  const [countdown, setCountdown] = useState(0)
  const [sendError, setSendError] = useState<string | null>(null)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  useEffect(() => {
    if (!otpState.lastSentAt) return
    const end = otpState.lastSentAt + COOLDOWN_SECONDS * 1000
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setCountdown(remaining)
      if (remaining === 0) dispatch(setCooldown(false))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [otpState.lastSentAt, dispatch])

  const sendMutation = useMutation({
    mutationFn: ({ phone }: { phone: string }) => sendOtpApi(phone),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(otpSent(Date.now()))
        setSendError(null)
      } else {
        setSendError(data.error || 'Failed to send OTP')
      }
    },
    onError: () => setSendError('Network error. Please try again.'),
  })

  const verifyMutation = useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => verifyOtpApi(phone, otp),
    onSuccess: (data) => {
      if (data.success && data.data?.sessionToken) {
        dispatch(otpVerified(data.data.sessionToken))
        setVerifyError(null)
      } else {
        dispatch(otpAttemptFailed())
        setVerifyError(data.error || 'Incorrect OTP')
      }
    },
    onError: () => setVerifyError('Network error. Please try again.'),
  })

  const sendOtp = useCallback(
    (phone: string) => {
      setSendError(null)
      sendMutation.mutate({ phone })
    },
    [sendMutation],
  )

  const verifyOtp = useCallback(
    (phone: string, otp: string) => {
      setVerifyError(null)
      verifyMutation.mutate({ phone, otp })
    },
    [verifyMutation],
  )

  const reset = useCallback(() => {
    dispatch(resetOtp())
    setCountdown(0)
    setSendError(null)
    setVerifyError(null)
  }, [dispatch])

  return {
    ...otpState,
    countdown,
    sendOtp,
    verifyOtp,
    reset,
    isSending: sendMutation.isPending,
    isVerifying: verifyMutation.isPending,
    sendError,
    verifyError,
  }
}
