import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OutWork from './OutWork.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OutWork />
  </StrictMode>,
)
