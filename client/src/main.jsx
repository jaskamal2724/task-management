import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUpForm from './components/SignupForm'
import SignIn from './components/Signin'
import Navbar from './components/Navbar'
import Userdashboard from './components/Userdashboard'
import Task from './components/Task'
import Teampage from './components/Teampage'
import Adminpage from './components/Adminpage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUpForm />
  },
  {
    path: "/dashboard",
    element: <Userdashboard />
  },
  {
    path:"/admin",
    element:<Adminpage/>
  }, 
  {
    path: "/task/:id",
    element: <Task />
  },
  {
    path:"/team",
    element:<Teampage/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
