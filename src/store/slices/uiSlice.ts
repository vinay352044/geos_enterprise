import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketplaceFilter {
  vehicleType: string
  minYear: number
  maxYear: number
  minSeats: number
}

interface UiState {
  mobileMenuOpen: boolean
  activeVehicleCategory: string
  activeMarketplaceFilter: MarketplaceFilter
}

const currentYear = new Date().getFullYear()

const initialState: UiState = {
  mobileMenuOpen: false,
  activeVehicleCategory: 'All',
  activeMarketplaceFilter: {
    vehicleType: 'All',
    minYear: 2015,
    maxYear: currentYear,
    minSeats: 1,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload
    },
    setActiveVehicleCategory(state, action: PayloadAction<string>) {
      state.activeVehicleCategory = action.payload
    },
    setMarketplaceFilter(state, action: PayloadAction<Partial<MarketplaceFilter>>) {
      state.activeMarketplaceFilter = { ...state.activeMarketplaceFilter, ...action.payload }
    },
    resetMarketplaceFilter(state) {
      state.activeMarketplaceFilter = initialState.activeMarketplaceFilter
    },
  },
})

export const { setMobileMenuOpen, setActiveVehicleCategory, setMarketplaceFilter, resetMarketplaceFilter } =
  uiSlice.actions
export default uiSlice.reducer
