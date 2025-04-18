import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login.jsx";
import Auth from './components/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>,
  }
])

createRoot(document.getElementById('root')).render(
  <Auth.Provider>
    <RouterProvider router={router}/>
  </Auth.Provider>,
)
