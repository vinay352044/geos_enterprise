'use client'

import { motion } from 'framer-motion'
import { TextField, MenuItem } from '@mui/material'
import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store'
import { setMarketplaceFilter, resetMarketplaceFilter } from '@/store/slices/uiSlice'

const SEAT_OPTIONS = [
  { value: 1, label: 'Any Capacity' },
  { value: 5, label: '5+ Seats' },
  { value: 7, label: '7+ Seats' },
  { value: 12, label: '12+ Seats' },
  { value: 20, label: '20+ Seats' },
]

const currentYear = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => currentYear - i)

const selectSx = {
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
}

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((s) => s.ui.activeMarketplaceFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="bg-white rounded-xl p-5 mb-8 border border-black/[0.04]"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={14} style={{ color: '#6b7280' }} strokeWidth={1.5} />
        <span className="font-body font-medium text-[13px]" style={{ color: '#0a0f1c' }}>
          Filter Vehicles
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <TextField
          select
          label="Vehicle Type"
          value={filter.vehicleType}
          onChange={(e) => dispatch(setMarketplaceFilter({ vehicleType: e.target.value }))}
          size="small"
          fullWidth
          sx={selectSx}
        >
          {['All', 'Sedan', 'SUV', 'Luxury SUV', 'Tempo Traveller', 'Minibus', 'Bus'].map((opt) => (
            <MenuItem key={opt} value={opt} sx={{ fontFamily: '"Inter", sans-serif', fontSize: '14px' }}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Min Year"
          value={filter.minYear}
          onChange={(e) => dispatch(setMarketplaceFilter({ minYear: Number(e.target.value) }))}
          size="small"
          fullWidth
          sx={selectSx}
        >
          {YEAR_OPTIONS.map((y) => (
            <MenuItem key={y} value={y} sx={{ fontFamily: '"Inter", sans-serif', fontSize: '14px' }}>
              {y}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Seating Capacity"
          value={filter.minSeats}
          onChange={(e) => dispatch(setMarketplaceFilter({ minSeats: Number(e.target.value) }))}
          size="small"
          fullWidth
          sx={selectSx}
        >
          {SEAT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ fontFamily: '"Inter", sans-serif', fontSize: '14px' }}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={() => dispatch(resetMarketplaceFilter())}
          className="flex items-center gap-1.5 font-body font-medium text-[12px] px-3 py-1.5 rounded-lg border border-[#e5e2dd] text-[#6b7280] hover:bg-[#f5f3f0] transition-colors"
        >
          <RotateCcw size={11} strokeWidth={1.5} />
          Reset
        </button>
      </div>
    </motion.div>
  )
}
