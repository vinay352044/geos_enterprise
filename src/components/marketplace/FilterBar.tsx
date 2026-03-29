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
    backgroundColor: '#FFFFFF',
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
}

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((s) => s.ui.activeMarketplaceFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl p-5 mb-8"
      style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(13,27,62,0.06)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={15} style={{ color: '#1E3A8A' }} />
        <span className="font-heading font-bold text-[13px] uppercase tracking-widest" style={{ color: '#0D1B3E' }}>
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
          className="flex items-center gap-2 font-heading font-semibold text-[12px] uppercase tracking-wider px-4 py-2 rounded-xl border transition-all duration-200 hover:bg-slate-50"
          style={{ borderColor: '#CBD5E1', color: '#475569' }}
        >
          <RotateCcw size={12} />
          Reset Filters
        </button>
      </div>
    </motion.div>
  )
}
