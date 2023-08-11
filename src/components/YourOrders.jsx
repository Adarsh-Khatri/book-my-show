import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function YourOrders() {

  const location = useLocation();

  const navbar = () => {
    return (
      <>
        <div className="row">
          <div className='d-flex gap-5 bg-body-secondary rounded rounded-top-0 py-3 px-5 yourorders-navbar'>
            <Link className={`text-decoration-none ${location.pathname === "/movies/yourOrders" && "yourorders-navlink"} `} to='/movies/yourOrders'>Recent Bookings</Link>
            <Link className={`text-decoration-none ${location.pathname === "/movies/yourOrders/preBookings" && "yourorders-navlink"} `} to='/movies/yourOrders/preBookings'>Pre Bookings</Link>
            <Link className={`text-decoration-none ${location.pathname === "/movies/yourOrders/addOns" && "yourorders-navlink"} `} to='/movies/yourOrders/addOns'>Add Ons</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">{navbar()}</div>
      <div className="row"><Outlet /></div>
    </div>
  )
}

export default YourOrders