import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUpForm from './components/SignupForm'
import SignIn from './components/Signin'

const router = createBrowserRouter([
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
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </StrictMode>,
)
