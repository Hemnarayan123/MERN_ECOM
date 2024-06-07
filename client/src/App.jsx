import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './components/context/AuthToken'
import Header from './components/Pages/Header'
import Footer from './components/Pages/Footer'


function App() {

  return (
<>
<Toaster />
<AuthProvider>
<Header/>
<Outlet />
<Footer/>
</AuthProvider>

</> 
  )
}

export default App
