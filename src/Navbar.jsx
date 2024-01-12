import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [activeNav, setActiveNav] = useState('')

  return (
    <nav className="navbar flex justify-between items-center">
      <Link to={'/'} onClick={() => setActiveNav('')}>
    <div className="logo text-xl font-bold p-4">نرم افزار دوخت</div>
      </Link>
    <div className="flex p-1">
      <Link to='/reports' onClick={() => setActiveNav('reports')}>
      <div className={`nav-item ${activeNav == 'reports' && 'active-nav'}`}>گذارشات</div>
      </Link>
      <Link to='/customers' onClick={() => setActiveNav('customers')}>
      <div className={`nav-item ${activeNav == 'customers' && 'active-nav'}`}>مشتریان</div>
      </Link>
      <Link to='/new' onClick={() => setActiveNav('new')}>
      <div className={`nav-item rounded-r-full ${activeNav == 'new' && 'active-nav'}`}>جدید</div>
      </Link>
    </div>
  </nav>
  )
}

export default Navbar