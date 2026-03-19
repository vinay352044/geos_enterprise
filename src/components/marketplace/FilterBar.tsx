'use client'

import { TextField, MenuItem, Button, Box } from '@mui/material'
import { RotateCcw } from 'lucide-react'
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

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((s) => s.ui.activeMarketplaceFilter)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr) auto' },
        gap: 2,
        alignItems: 'center',
        p: 3,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        mb: 4,
      }}
    >
      <TextField
        select
        label="Vehicle Type"
        value={filter.vehicleType}
        onChange={(e) => dispatch(setMarketplaceFilter({ vehicleType: e.target.value }))}
        size="small"
        fullWidth
      >
        {['All', 'Sedan', 'SUV', 'Luxury SUV', 'Tempo Traveller', 'Minibus', 'Bus'].map((opt) => (
          <MenuItem key={opt} value={opt}>
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
      >
        {YEAR_OPTIONS.map((y) => (
          <MenuItem key={y} value={y}>
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
      >
        {SEAT_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="outlined"
        size="small"
        startIcon={<RotateCcw size={14} />}
        onClick={() => dispatch(resetMarketplaceFilter())}
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          borderColor: '#334155',
          color: '#334155',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          height: '40px',
        }}
      >
        Reset
      </Button>
    </Box>
  )
}
