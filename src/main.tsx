import { StrictMode } from 'react'
import { App } from './App'
import ReactDOM from 'react-dom/client'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
