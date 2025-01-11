import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const theme = createTheme()
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
