import { Chip } from '@mui/material'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComplianceBadgeProps {
  label?: string
  size?: 'small' | 'medium'
  className?: string
}

export function ComplianceBadge({
  label = '100% Taxi Plated',
  size = 'small',
  className,
}: ComplianceBadgeProps) {
  return (
    <Chip
      icon={<CheckCircle size={14} className="text-white" />}
      label={label}
      size={size}
      className={cn('font-heading font-semibold', className)}
      sx={{
        backgroundColor: '#166534',
        color: '#ffffff',
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 600,
        fontSize: size === 'small' ? '11px' : '13px',
        '& .MuiChip-icon': { color: '#ffffff' },
        '& .MuiChip-label': { paddingLeft: '4px' },
      }}
    />
  )
}
