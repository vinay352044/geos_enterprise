'use client'

import { Card, CardContent, CardActions, Button, Chip } from '@mui/material'
import { Users, Fuel, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store'
import { setPrefilledVehicleType } from '@/store/slices/formSlice'
import { ComplianceBadge } from '@/components/ui/ComplianceBadge'
import type { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleRequestVehicle = () => {
    dispatch(setPrefilledVehicleType(vehicle.category))
    const el = document.getElementById('call-basis-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#call-basis-form')
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
      }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden rounded-t-xl">
        <Image
          src={vehicle.images[0] || '/images/fleet/placeholder.jpg'}
          alt={`${vehicle.name} — ${vehicle.category} fleet vehicle from GEOS Enterprises`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <ComplianceBadge />
          <Chip
            label={vehicle.category}
            size="small"
            sx={{
              backgroundColor: '#0D2B5E',
              color: '#ffffff',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              fontSize: '11px',
            }}
          />
        </div>
      </div>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <h3 className="font-heading font-semibold text-navy text-xl mb-1">{vehicle.name}</h3>
        <p className="font-body text-slate text-sm mb-3">{vehicle.model} · {vehicle.year}</p>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-sm text-slate mb-3">
          <span className="flex items-center gap-1">
            <Users size={14} className="text-accent" />
            {vehicle.seatingCapacity} seats
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={14} className="text-accent" />
            {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={14} className="text-accent" />
            {vehicle.transmission}
          </span>
        </div>

        <p className="font-body text-slate text-sm line-clamp-2">{vehicle.description}</p>

        {/* Available for */}
        <div className="flex flex-wrap gap-1 mt-3">
          {vehicle.availableFor.slice(0, 2).map((use) => (
            <Chip
              key={use}
              label={use}
              size="small"
              variant="outlined"
              sx={{ fontSize: '10px', fontFamily: '"Montserrat", sans-serif', borderColor: '#1E40AF', color: '#1E40AF' }}
            />
          ))}
        </div>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={handleRequestVehicle}
          endIcon={<ArrowRight size={14} />}
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'uppercase',
            backgroundColor: '#0D2B5E',
            '&:hover': { backgroundColor: '#081A3E' },
          }}
        >
          Request This Vehicle
        </Button>
        <Button
          variant="outlined"
          size="small"
          component={Link}
          href={`/fleet/${vehicle.slug}`}
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            textTransform: 'uppercase',
            borderColor: '#0D2B5E',
            color: '#0D2B5E',
            minWidth: '80px',
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  )
}
