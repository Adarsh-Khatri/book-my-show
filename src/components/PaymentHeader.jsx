import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LOGO from '../assets/logo.svg';

function PaymentHeader() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container-fluid">
          <div className="row navbar-bg rounded rounded-top-0 px-5">
            <nav className="navbar navbar-expand-lg navbar-bg text-light">
              <Link className="navbar-brand" to="/movies"><img src={LOGO} alt="book my show logo" className='logo' /></Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="row">
        <Outlet />
      </div>
    </div>
  )
}

export default PaymentHeader;