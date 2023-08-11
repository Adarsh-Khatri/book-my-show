import React, { useEffect, useState } from 'react'
import { getApi } from '../services/httpServices'
import { getUser } from '../services/storageServices';

function RecentBooking() {

  let [bookings, setBookings] = useState([]);
  

  const fetchData = async () => {
    try {
      let data = await getApi(`/getBookingById/${getUser()}`);
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const displayAllBookings = () => {
    return (
      <>
        <div className="container">
          <div className="row mt-5 p-0 bg-dark text-light lead fw-bold text-center">
            <div className="col-md-2 border">Movie</div>
            <div className="col-md-2 border">Hall</div>
            <div className="col-md-1 border">Amount</div>
            <div className="col-md-2 border">Seats</div>
            <div className="col-md-2 border">Date</div>
            <div className="col-md-1 border">Start</div>
            <div className="col-md-2 border">Payment</div>
          </div>
          {
            bookings?.map(booking => (
              <div className="row text-center py-3 recentbooking">
                <div className="col-md-2">{booking.movie}</div>
                <div className="col-md-2">{booking.hall}</div>
                <div className="col-md-1">{booking.amount}</div>
                <div className="col-md-2">{booking.seats.join(", ")}</div>
                <div className="col-md-2">{booking.date}</div>
                <div className="col-md-1">{booking.startTime}</div>
                <div className="col-md-2">{booking.payment}</div>
              </div>
            ))
          }
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">
        {bookings.length === 0 ?
          (
            <div className='mt-5'>
              <h1 className='fw-bold alert alert-info text-center' role='alert'>No Bookings Yet</h1>
            </div>
          )
          : displayAllBookings()}
      </div>
    </div>
  )
}

export default RecentBooking;