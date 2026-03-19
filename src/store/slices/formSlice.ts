import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OtpState {
  sent: boolean
  verified: boolean
  sessionToken: string | null
  attempts: number
  lastSentAt: number | null
  cooldownActive: boolean
}

interface FormState {
  otp: OtpState
  prefilledVehicleType: string | null
}

const initialState: FormState = {
  otp: {
    sent: false,
    verified: false,
    sessionToken: null,
    attempts: 0,
    lastSentAt: null,
    cooldownActive: false,
  },
  prefilledVehicleType: null,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    otpSent(state, action: PayloadAction<number>) {
      state.otp.sent = true
      state.otp.lastSentAt = action.payload
      state.otp.cooldownActive = true
    },
    otpVerified(state, action: PayloadAction<string>) {
      state.otp.verified = true
      state.otp.sessionToken = action.payload
    },
    otpAttemptFailed(state) {
      state.otp.attempts += 1
    },
    resetOtp(state) {
      state.otp = initialState.otp
    },
    setCooldown(state, action: PayloadAction<boolean>) {
      state.otp.cooldownActive = action.payload
    },
    setPrefilledVehicleType(state, action: PayloadAction<string | null>) {
      state.prefilledVehicleType = action.payload
    },
  },
})

export const {
  otpSent,
  otpVerified,
  otpAttemptFailed,
  resetOtp,
  setCooldown,
  setPrefilledVehicleType,
} = formSlice.actions
export default formSlice.reducer
