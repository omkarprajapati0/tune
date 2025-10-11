import { Outlet, Link, NavLink } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div style={{ maxWidth: '100%', padding: 0 }}>
      <nav style={{ display: 'flex', gap: 12, padding: 12, background: '#222', color: '#fff', position: 'sticky', top: 0 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          TuneWave
        </Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <NavLink to="/all-songs" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>All</NavLink>
          <NavLink to="/english-songs" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>English</NavLink>
          <NavLink to="/hindi-songs" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Hindi</NavLink>
          <NavLink to="/marathi-songs" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Marathi</NavLink>
          <NavLink to="/about" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>About</NavLink>
          <NavLink to="/help" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Help</NavLink>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <NavLink to="/account" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Account</NavLink>
          <NavLink to="/settings" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Settings</NavLink>
          <NavLink to="/login" style={({isActive}) => ({ color: isActive ? '#ffd700' : '#fff' })}>Login</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
