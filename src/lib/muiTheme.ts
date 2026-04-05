'use client'

import { createTheme } from '@mui/material/styles'

export const geosTheme = createTheme({
  palette: {
    primary: {
      main: '#0a0f1c',
      light: '#1a2332',
      dark: '#060a14',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3366ff',
      light: '#5580ff',
      contrastText: '#ffffff',
    },
    success: {
      main: '#1a7a42',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c23a22',
    },
    warning: {
      main: '#c8956c',
    },
    background: {
      default: '#fafaf8',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3036',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          minHeight: '44px',
          padding: '12px 24px',
          fontSize: '14px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#0a0f1c',
          '&:hover': { backgroundColor: '#1a2332' },
        },
        outlinedPrimary: {
          borderWidth: '1.5px',
          borderColor: '#e5e2dd',
          color: '#2d3036',
          '&:hover': { borderWidth: '1.5px', borderColor: '#0a0f1c', backgroundColor: 'transparent' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            minHeight: '48px',
            borderRadius: '10px',
            backgroundColor: '#fafaf8',
            '& fieldset': {
              borderColor: '#e5e2dd',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#c8956c55',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0a0f1c',
              borderWidth: '1.5px',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Inter", sans-serif',
            color: '#9ca3af',
            '&.Mui-focused': {
              color: '#0a0f1c',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
          borderRadius: '8px',
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
  shape: { borderRadius: 10 },
})
