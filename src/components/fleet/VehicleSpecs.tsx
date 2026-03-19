import { Table, TableBody, TableCell, TableRow, Chip } from '@mui/material'
import { CheckCircle } from 'lucide-react'
import { ComplianceBadge } from '@/components/ui/ComplianceBadge'
import type { Vehicle } from '@/types'

interface VehicleSpecsProps {
  vehicle: Vehicle
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="space-y-6">
      {/* Compliance badges */}
      <div className="flex flex-wrap gap-2">
        <ComplianceBadge label="100% Taxi Plated" size="medium" />
        {vehicle.insuranceValid && (
          <Chip
            icon={<CheckCircle size={14} />}
            label="Insurance Valid"
            size="medium"
            sx={{ backgroundColor: '#dbeafe', color: '#1E40AF', fontFamily: '"Montserrat", sans-serif', fontWeight: 600, '& .MuiChip-icon': { color: '#1E40AF' } }}
          />
        )}
        <Chip
          label={vehicle.permitType}
          size="medium"
          sx={{ backgroundColor: '#f1f5f9', color: '#334155', fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
        />
      </div>

      {/* Spec table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <Table size="small">
          <TableBody>
            {Object.entries(vehicle.specifications).map(([key, value], idx) => (
              <TableRow
                key={key}
                sx={{ backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#ffffff' }}
              >
                <TableCell
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 600,
                    color: '#334155',
                    width: '40%',
                    py: 1.5,
                    borderColor: '#e2e8f0',
                  }}
                >
                  {key}
                </TableCell>
                <TableCell sx={{ color: '#334155', py: 1.5, borderColor: '#e2e8f0' }}>
                  {value}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
              <TableCell sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600, color: '#334155', py: 1.5, borderColor: '#e2e8f0' }}>
                AC Available
              </TableCell>
              <TableCell sx={{ py: 1.5, borderColor: '#e2e8f0' }}>
                {vehicle.acAvailable ? '✓ Yes' : 'No'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-heading font-semibold text-navy mb-3">Included Features</h4>
        <div className="flex flex-wrap gap-2">
          {vehicle.features.map((f) => (
            <Chip
              key={f}
              label={f}
              size="small"
              icon={<CheckCircle size={12} />}
              sx={{
                backgroundColor: '#f0fdf4',
                color: '#166534',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                '& .MuiChip-icon': { color: '#166534' },
              }}
            />
          ))}
        </div>
      </div>

      {/* Available for */}
      <div>
        <h4 className="font-heading font-semibold text-navy mb-3">Suitable For</h4>
        <div className="flex flex-wrap gap-2">
          {vehicle.availableFor.map((use) => (
            <Chip
              key={use}
              label={use}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#1E40AF',
                color: '#1E40AF',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                fontSize: '12px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
