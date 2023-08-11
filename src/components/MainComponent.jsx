import React, { createContext, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import MovieDetails from './MovieDetails';
import BuyTickets from './BuyTickets';
import SeatSelection from './SeatSelection';
import PaymentPage from './PaymentPage';
import PaymentHeader from './PaymentHeader';
import PaymentConfirm from './PaymentConfirm';
import SignOut from './SignOut';
import YourOrders from './YourOrders';
import PreBookings from './PreBookings';
import AddOns from './AddOns';
import RecentBooking from './RecentBooking';
import EditProfile from './EditProfile';

// ---------------------------------------------------------- CREATING CONTEXT 

export const MySearchContext = createContext('');
export const MyCityContext = createContext('NCR');
export const MyTimeContext = createContext('');
export const MyUserContext = createContext('');


// ---------------------------------------------------------- MAIN COMPONENT STARTS

function MainComponent() {

  const [search, setSearch] = useState("");

  const [city, setCity] = useState('NCR');

  const [slotTime, setSlotTime] = useState('');

  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const handlingCity = (city) => {
    setCity(city)
    navigate(`/movies`)
  }

  return (
    <div className="container-fluid">
      <MySearchContext.Provider value={{ search, setSearch }}>
        <MyCityContext.Provider value={{ city, handlingCity }}>
          <MyTimeContext.Provider value={{ slotTime, setSlotTime }}>
            <MyUserContext.Provider value={{ user, setUser }}>


              <Routes>


                <Route path='/movies' element={<Navbar />}>
                  <Route index element={<Home />} />
                  <Route path='movieDetails/:city/:imdbID/:Title' element={<MovieDetails />} />
                  <Route path='buytickets/:city/:id/:title/:language/:format' element={<BuyTickets />} />
                  <Route path='editProfile' element={<EditProfile />} />

                  <Route path='yourOrders' element={<YourOrders />} >
                    <Route index element={<RecentBooking />} />
                    <Route path='preBookings' element={<PreBookings />} />
                    <Route path='addOns' element={<AddOns />} />
                  </Route>
                </Route>

                <Route path='/seatSelection/:city/:movieHallId/:id/:title/:language/:format/:date' element={<SeatSelection />} />
                <Route path='/signout' element={<SignOut />} />

                <Route path='/payment' element={<PaymentHeader />}>
                  <Route path='page' element={<PaymentPage />} />
                  <Route path='confirm' element={<PaymentConfirm />} />
                </Route>

                {/* ------------------------------------------------------------  NAVIGATING TO MOVIES */}

                <Route path='/' element={<Navigate to="/movies" />} />

              </Routes>


            </MyUserContext.Provider>
          </MyTimeContext.Provider>
        </MyCityContext.Provider>
      </MySearchContext.Provider>
    </div>
  )
}

export default MainComponent;



