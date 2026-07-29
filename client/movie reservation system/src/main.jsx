import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' //tells react to render the app inside hmtl page
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
