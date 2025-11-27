import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './styles.js'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>
)
