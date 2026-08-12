import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { AppRoute } from './routes/AppRoute'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <AppRoute/>
    </>
  )
}

export default App

