import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Channel, Collection, Dashboard, EditProfile, History, Home, Login, Signup, Subscriptions, Support, VideoDetail} from "./pages/index.ts"
import {AuthProvider} from "./context/AuthCotext.tsx"
import MainLayout from './layout/MainLayout.tsx'
import AuthLayout from './layout/AuthLayout.tsx'
import NotFound from './components/NotFound.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <AuthProvider>
        <MainLayout/> 
      </AuthProvider>
    ),
    children: [
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/video/:videoId",
        element:<VideoDetail/>
      },
      {
        path:"/c/:username",
        element:<Channel/>
      },
      {
        path:"/profile/:userId",
        element:<EditProfile/>
      },
      {
        path:"/history",
        element:<History/>
      },
      {
        path:"/collection",
        element:<Collection/>
      },
      {
        path: "/subscriptions",
        element:<Subscriptions/>
      },
      {
        path:"/support",
        element:<Support/>
      }
    ]
  },
  {
    path:"/",
    element:(
      <AuthProvider>
        <AuthLayout/>
      </AuthProvider>
    ),
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Signup/>
      }
    ]
  },
  {
    path:"*",
    element:<NotFound/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
