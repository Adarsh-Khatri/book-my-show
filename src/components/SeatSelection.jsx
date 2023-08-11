import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../services/httpServices';
import MovieHallScreen from '../assets/hallScreen.png';
import { MyTimeContext, MyUserContext } from './MainComponent';
import Login from './Login';
import { getTime, getUser, storeDetails } from '../services/storageServices';



function SeatSelection() {

  const navigate = useNavigate();

  const { city, movieHallId, id, title, language, format, date } = useParams();

  //  FOR STORING MOVIE HALL DETAILS TO SHOW TIME
  const [details, setDetails] = useState({});

  //  FOR STORING SEATING ARRANGEMENT DATA
  const [seatingArrangement, setSeatingArrangement] = useState([]);

  // FOR STORING ALL THE SELECTED SEATS
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { slotTime, setSlotTime } = useContext(MyTimeContext);

  const { user } = useContext(MyUserContext);

  console.log(user);

  const totalPrice = selectedSeats.reduce((acc, cur) => {
    let tempSeatZone = seatingArrangement.find(arrangement => arrangement.seats.findIndex(seat => seat[0] === cur[0]) >= 0);
    let price = tempSeatZone.price;
    return acc + price;
  }, 0);


  // GETTING DATA FROM API

  const fetchData = async () => {
    let data = await getApi(`/movieHallDetails/${city}/${id}/${movieHallId}`);
    setDetails(data);
  }

  const fetchSeatingArrangementData = async () => {
    let data = await getApi(`/seatSelection/${slotTime || getTime()}/${movieHallId}`);
    setSeatingArrangement(data);
    setSelectedSeats([])
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchSeatingArrangementData()
  }, [slotTime])

  const formatDate = () => {
    let curDate = new Date(date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
    let month = months[curDate.getMonth()];
    const day = days[curDate.getDay()];
    const date1 = curDate.getDate();
    return `${day}, ${date1 < 10 ? '0' + date1 : date1} ${month}`
  }

  // GO BACK TO SELECT CINEMAS FOR A MOVIE
  const goBack = () => navigate(-1);

  const storingSelectedTime = (selectedTime) => {
    setSlotTime(selectedTime)
  }

  const updatedValue = (val) => {
    let arrA = val.split('');
    arrA[3] = arrA[3] === '0' ? '1' : '0';
    return arrA.join('');
  }

  const handleChange = (value) => {
    let newValue = updatedValue(value)
    let index = selectedSeats.indexOf(newValue);
    if (index >= 0) {
      setSelectedSeats(pre => (pre.filter(p => p != newValue)))
    } else {
      setSelectedSeats(pre => ([...pre, newValue]))
    }
  }

  const isChecked = (a) => {
    let newValue = updatedValue(a)
    return selectedSeats.includes(newValue)
  }

  const goToPayment = async () => {
    console.log(slotTime, getTime());
    let data = { city, movieHallId, id, title, language, format, date, totalPrice, slotTime, selectedSeats, movieHall: details.movieHall, userId: getUser() };
    if (!slotTime && !getTime()) return alert("Please Choose Time Slot");
    storeDetails(data);
    navigate('/payment/page', data);
  }

  // DISPLAYING MOVIE HEADER CONTAINING INFO (MOVIE NAME, CINEMA NAME, DATE, TIME, NUM OF TICKETS, AND GO BACK)

  const movieHeader = () => {
    return (
      <>
        <div className='row'>
          <div className='seatselection-header'>
            <div><i type='button' className="bi bi-chevron-left fs-5" onClick={goBack}></i></div>
            <div className='w-100'>
              <span type="button" onClick={() => navigate(`/movies/movieDetails/${city}/${id}/${title}`)}>{title}</span>
              <div className='fw-bold'>{details.movieHall}, {city} | {formatDate()}, {slotTime || getTime()}</div>
            </div>
            <div className='d-flex align-items-center gap-5'>
              <span type='button' className='badge border d-flex gap-2'><span>{selectedSeats.length} Tickets</span> <i className="bi bi-pencil"></i></span>
              <div><i type='button' className="bi bi-x" onClick={goBack}></i></div>
            </div>
          </div>
        </div>
      </>
    )
  }


  // DISPLAYING AVAILABLE TIME FOR SHOWS
  const showingTime = () => {
    return (
      <div className='row'>
        <div className='bg-light d-flex gap-3 py-3 px-5 rounded rounded-top-0 seatselection-btn-time'>
          {
            details?.seats?.map((s, i) => <div key={s} className={` ${i === 0 ? 'seatselection-first-unselected-btn-time' : 'seatselection-unselected-btn-time'} rounded-1 px-4 py-2 ${(slotTime || getTime()) === s.time && 'seatselection-selected-btn-time'}`} ><span type="button" onClick={() => storingSelectedTime(s.time)}>{s.time}</span></div>)
          }
        </div>
      </div>
    )
  }


  const makingSeats = (arr) => {
    return (
      <div className='d-flex seatselection-row-layout'>
        <div className='fw-bold seatselection-row-seat-name'>{arr[0][0]}</div>
        <div className='seatselection-row-seat-num'>
          {
            arr.map((a, i) =>
              <div key={`${i}`} className='seatselection-row-one-seat'>
                {
                  a.length === 2 ? (
                    <div className="seatselection-row-one-seat-cover">
                      <label>&nbsp;&nbsp;</label>
                    </div>) : (
                    <div className='seatselection-row-one-seat-cover'>
                      <label type={a[a.length - 1] === "0" && "button"} className={`${a[a.length - 1] === "1" ? 'seatselection-seat-sold' : `${isChecked(a) ? 'seatselection-row-one-seat-selected' : 'seatselection-row-one-display-seat'}`}`} value={a} onClick={() => a[a.length - 1] === "0" && handleChange(a)} disabled={a[a.length - 1] === "1"}>{a.slice(1, 3) < 10 ? a.slice(2, 3) : a.slice(1, 3)}</label>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }


  const showingSeats = () => {
    return (
      <>
        <div className='seatselection-seating-arrangement'>
          {
            seatingArrangement.map((arrangement, i) => {
              return (
                <>
                  <div key={`${i}`} className='d-flex flex-column seatselection-row-type'>
                    <div>{arrangement.type}-Rs. {arrangement.price.toFixed(2)}</div>
                    <div className='d-flex flex-column seatselection-row-layout-container'>
                      {
                        arrangement.seats.map((seat, i) => (makingSeats(seat.split(':'))))
                      }
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
        <div className="row">
          <div className=''>{showingScreen()}</div>
        </div>
      </>
    )
  }


  const showingScreen = () => {
    return (
      <>
        <div className='seatselection-screen'>
          <div>&nbsp;&nbsp;</div>
          <div className='text-center '>
            <img src={MovieHallScreen} alt="hall screen" />
            <div >All eyes this way please!</div>
          </div>
        </div>
      </>
    )
  }


  // DISPLAYING SEAT INFO LIKE AVAILABLE, SELECTED OR SOLD

  const seatInfo = () => {
    return (
      <div className='row'>
        <div className='bg-light rounded rounded-bottom-0 py-2 position-fixed bottom-0 d-flex gap-4 justify-content-center seatselection-seat-info'>
          <div>
            <div className='d-flex gap-2 mx-1 align-items-center'><span></span><span>Available</span></div>
          </div>
          <div>
            <div className='d-flex gap-2 mx-1 align-items-center'><span></span><span>Selected</span></div>
          </div>
          <div>
            <div className='d-flex gap-2 mx-1 align-items-center'><span></span><span>Sold</span></div>
          </div>
        </div>
      </div>
    )
  }

  const payNow = () => {
    return (
      <>
        <div className="row">
          <div className='bg-light rounded rounded-bottom-0 position-fixed bottom-0 z-2 text-center seatselection-paynow-btn'>

            {/* -----------------------------------------------------------Button trigger modal*/}

            {
              (user || getUser()) ? (
                <button type="button" className='btn' onClick={goToPayment}>Pay Rs.{totalPrice.toFixed(2)}</button>
              ) : (
                <button type="button" className='btn' data-bs-toggle='modal' data-bs-target="#signInModal">Pay Rs.{totalPrice.toFixed(2)}</button>
              )
            }

          </div>
          <div>

            {/* ----------------------------------------------------------- Modal */}

            <div className="modal modal-sm fade" id="signInModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className='text-end'>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="fs-5 my-0 text-center w-100 fw-bold mb-3" id="signInModalLabel">Get Started</div>
                    <div className='seatselection-google-num'>
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
                    <div><Login /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row">{movieHeader()}</div>
      <div className="row">{showingTime()}</div>
      <div className="row">{showingSeats()}</div>
      <div className="row">{selectedSeats.length === 0 ? seatInfo() : payNow()}</div>
    </div>
  )
}

export default SeatSelection;


