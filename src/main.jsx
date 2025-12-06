import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this has .jsx or matches the file name
import './index.css' // (Optional, only if you have this file)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)