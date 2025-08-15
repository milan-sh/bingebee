import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home, Login, Signup, VideoListPage} from "./pages/index.ts"
import {AuthProvider} from "./context/AuthCotext.tsx"

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <AuthProvider>
        <App/>
      </AuthProvider>
    ),
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/videos",
        element:<VideoListPage/>  
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
