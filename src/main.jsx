import React from 'react'
import ReactDOM from 'react-dom/client'
import { TomatoTimer } from './TomatoTimer.jsx'
import "./index.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TomatoTimer />
  </React.StrictMode>,
)
