'use client'

import { createTheme } from '@mui/material/styles'

export const geosTheme = createTheme({
  palette: {
    primary: {
      main: '#0D2B5E',
      light: '#1E40AF',
      dark: '#081A3E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1E40AF',
      light: '#2563EB',
      contrastText: '#ffffff',
    },
    success: {
      main: '#166534',
      contrastText: '#ffffff',
    },
    error: {
      main: '#991B1B',
    },
    warning: {
      main: '#92400E',
    },
    background: {
      default: '#F1F5F9',
      paper: '#ffffff',
    },
    text: {
      primary: '#334155',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          minHeight: '48px',
          padding: '14px 32px',
          fontSize: '16px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#0D2B5E',
          '&:hover': { backgroundColor: '#081A3E' },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': { borderWidth: '2px' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            minHeight: '48px',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            '&.Mui-focused fieldset': {
              borderColor: '#1E40AF',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1E40AF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: '48px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
  shape: { borderRadius: 6 },
})
