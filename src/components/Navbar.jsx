import React, { useContext, useEffect, useState } from 'react';
import LOGO from '../assets/logo.svg';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MyCityContext, MySearchContext } from './MainComponent';
import { getUser } from '../services/storageServices';
import { getApi } from '../services/httpServices';
import Login from './Login';


const Modal = () => {

  const { city, handlingCity } = useContext(MyCityContext);

  const location = useLocation();

  const cities = ["NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chandigarh", "Chennai", "Pune", "Kolkata", "Kochi"];


  return (
    <div >

      {/* -------------------------------------------------------------------- Button trigger modal  */}

      <div>
        <div type="button" data-bs-toggle="modal" data-bs-target="#cityModal">
          <li className="nav-item">
            <Link className="nav-link active fw-bold text-light d-flex gap-2 align-items-center p-0" aria-current="page" to={location.pathname}>
              <p className='p-0 m-0'>{city}</p>
              <p className='city-arrow p-0 m-0'><i className="bi bi-caret-down-fill"></i></p>
            </Link>
          </li>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- Modal */}

      <div className="modal fade" id="cityModal" tabIndex="-1" aria-labelledby="cityModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content text-dark">
            <div className="modal-header text-center">
              <div className="modal-title fs-5 w-100" id="cityModalLabel">Popular Cities</div>
            </div>
            <div className="modal-body">
              <div className="row ">
                <div className='d-flex gap-1'>
                  {
                    cities.map((c, index) => <div name="city" value={c} key={index} className={`border flex-grow-1 ${city === c ? 'bg-primary text-light fw-bold' : 'bg-light'} rounded rounded-3`} onClick={() => handlingCity(c)}>
                      <div type="button" className='py-3 text-center' data-bs-dismiss="modal">{c}</div>
                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Navbar() {

  const { search, setSearch } = useContext(MySearchContext);

  const [user, setUser] = useState({});


  const fetchData = async () => {
    try {
      let data = await getApi(`/getUserById/${getUser()}`)
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const navbarFooter = () => {
    return (
      <div className="row my-row">
        <div className='text-light d-md-flex justify-content-md-between nav-footer'>
          <div className='left'>
            <p><Link className='text-decoration-none text-light' to="/movies">Movies</Link></p>
            <p>Stream</p>
            <p>Events</p>
            <p>Plays</p>
            <p>Sports</p>
            <p>Activities</p>
            <p>Buzz</p>
          </div>
          <div className='right'>
            <p>ListYourShow</p>
            <p>Corporates</p>
            <p>Offers</p>
            <p>Gift Card</p>
          </div>
        </div>
      </div>
    )
  }

  const userDD = () => {
    return (
      <>
        <div className="dropdown-center">
          <span className="btn text-light border-0 d-flex gap-2 align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle lead"></i>
            <span>Hi, {user.name}!</span>
          </span>
          <ul className="dropdown-menu p-0 ">
            <div className='navbar-login-user'>
              <li><i className="bi bi-pencil px-2"></i> <Link to="/movies/editProfile">Edit Profile</Link></li>
              <li><i className="bi bi-handbag px-2"></i><Link to="/movies/yourOrders">Your Orders</Link></li>
              <li><i className="bi bi-chat-dots px-2"></i><Link to="/movies">Help and Support</Link></li>
              <li className='p-0'><Link className='btn btn-danger rounded-top-0 fw-bold m-0' to="/signout ">Sign Out</Link></li>
            </div>
          </ul>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row navbar-bg px-5">
          <nav className="navbar navbar-expand-lg navbar-bg text-light">
            <Link className="navbar-brand" to="/movies"><img src={LOGO} alt="book my show logo" className='logo' /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav d-flex justify-content-between w-100">
                <div>
                  <li className="nav-item position-relative">
                    <i type="button" className="bi bi-search text-dark search-glass"></i>
                    <input className="form-control me-2 px-5" type="search" placeholder="Search for Movies, Events, Plays, Sports and Activities" aria-label="Search" name='search' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
                  </li>
                </div>
                <div className='d-flex align-items-center gap-4'>
                  <li className="nav-item">{Modal()}</li>
                  <li className="nav-item">
                    {
                      user?.name ? (userDD())
                        : (
                          // <Link type='button' className='btn btn-danger btn-sm' to="/signin">Sign In</Link>
                          <>

                            {/* ---------------------------------------------- BUTTON TRIGGERS MODAL */}

                            <Link type='button' className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#signInModal" >Sign In</Link>


                            {/* ---------------------------------------------- MODAL */}

                            <div className="modal modal-sm fade" id="signInModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-body">
                                    <div className='text-end'>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="fs-5 my-0 text-center text-dark w-100 fw-bold mb-3" id="signInModalLabel">Get Started</div>
                                    <div className='navbar-google-num'>
                                      <div className='bg-light border rounded'>
                                        <span><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="google icon to login with user" /></span>
                                        <span>Continue With Google</span>
                                      </div>
                                      <div className='bg-light border rounded'>
                                        <span><i className="bi bi-phone"></i></span>
                                        <span>Use Phone Number</span>
                                      </div>
                                    </div>
                                    <div className='text-center my-4 text-secondary'>OR</div>
                                    <div className='text-dark'><Login /></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                    }
                  </li>
                </div>
              </ul>
            </div>
          </nav>
        </div>
        <div className='row navbar-footer-bg px-5'>
          {navbarFooter()}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar