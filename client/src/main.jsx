import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom'
import SignOut from './components/Auth/SignOut.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import EmailConfirmation from './components/Pages/EmailConfirmation.jsx';
import Home from './components/Pages/Home.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Profile from './components/Pages/Profile.jsx';



const router = createBrowserRouter([
  {
      path : '/',
      element: <App/>,
      children: [
          { path: '', element : <Home/>},
          { path : '/signin', element: <Login/>},
          { path: '/signup', element: <Signup/> },
          { path: '/signout', element: <SignOut/> },
          { path: '/forget_password', element: <ForgetPassword/> },
          { path: '/reset_password/:id/:token', element: <ResetPassword/> },
          { path: '/email_confirmation', element: <EmailConfirmation/> },
          { path: '/profile', element: <Profile/> }, 
      ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
