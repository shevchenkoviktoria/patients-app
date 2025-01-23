import { useMediaQuery } from '@mui/material'
import { createTheme, Theme, useTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C4D8C',
    },
    secondary: {
      main: '#89ABD9',
    },
    background: {
      default: '#F0F0F2',
      paper: '#B4CBD9',
    },
    text: {
      primary: '#0F3759',
      secondary: '#1C4D8C',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
})

export const useResponsive = () => {
  const muiTheme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'))
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up('md'))

  return { isSmallScreen, isMediumScreen, isLargeScreen }
}

export default theme
