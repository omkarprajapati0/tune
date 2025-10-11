import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import AllSongs from './pages/AllSongs.jsx'
import EnglishSongs from './pages/EnglishSongs.jsx'
import HindiSongs from './pages/HindiSongs.jsx'
import MarathiSongs from './pages/MarathiSongs.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Help from './pages/Help.jsx'
import Account from './pages/Account.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'all-songs', element: <AllSongs /> },
      { path: 'english-songs', element: <EnglishSongs /> },
      { path: 'hindi-songs', element: <HindiSongs /> },
      { path: 'marathi-songs', element: <MarathiSongs /> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'help', element: <Help /> },
      { path: 'account', element: <Account /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
