import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUpForm from './components/SignupForm'
import SignIn from './components/Signin'
import Navbar from './components/Navbar'

const router = createBrowserRouter([
  {
    path:"*",
    element:<Navbar/>
  },
  {
    path:"/",
    element:<SignUpForm/>
  },
  {
    path:"/signin",
    element:<SignIn/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Navbar/>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </StrictMode>,
)
