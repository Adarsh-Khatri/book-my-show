import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getApi } from '../services/httpServices';
import Tooltip from '@mui/material/Tooltip';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import Zoom from '@mui/material/Zoom'; // (or use any other transition component)
import { MyTimeContext } from './MainComponent';
import { storeTime } from '../services/storageServices';
import MyPopover from './MyPopover';

function BuyTickets() {

  const { city, id, title, language, format } = useParams();

  // FOR GETTING MOVIE TICKETS AT A TIME
  const { setSlotTime } = useContext(MyTimeContext)

  const navigate = useNavigate();

  // STORING MOVIE DETAILS COMING FROM API (FETCH METHOD)
  const [ticket, setTicket] = useState([]);

  // STORING GENRE DETAILS COMING FROM API (FETCH METHOD)
  const [genre, setGenre] = useState("");

  // STORING TODAY'S DATE ON CLICK
  const [selectedDate, setSelectedDate] = useState(new Date());

  //  FOR MOVING DATES
  let [startDateIndex, setStartDateIndex] = useState(0);

  const [filters, setFilters] = useState({ price: [], time: [] });

  const [searchParams, setSearchParams] = useSearchParams();


  // FORMATTING DATE INITIALIZER FUNCTION
  const formattingDate = (d = new Date()) => {
    let curDate = d;
    let year = curDate.getFullYear();
    let date = curDate.getDate();
    let month = curDate.getMonth() + 1;
    let dateStr = `${year}-${month}-${date}`;
    return dateStr;
  }

  // FOR SENDING SELECTED MOVIE HALL DATE
  const [movieHallDate, setMovieHallDate] = useState(formattingDate);

  const makeSearchString = (str, key, value) => {
    return (value.length !== 0 ? str ? `${str}&${key}=${value.join(',')}` : `?${key}=${value.join(',')}` : str)
  }
  const makeQueryParams = (filters) => {
    let str = "";
    Object.entries(filters).forEach(([key, value]) => {
      str = makeSearchString(str, key, value)
    })
    return str;
  };

  const fetchData = async () => {
    let queryParams = makeQueryParams(filters);
    setSearchParams(queryParams)
    let data = await getApi(`/buytickets/${city}/${id}/${queryParams}`);
    let data1 = await getApi(`/movies/${city}/${id}`);
    setTicket(data);
    setGenre(data1.Genre);
  }


  useEffect(() => {
    fetchData();
  }, [filters])


  // NAVIGATING TO CHOOSE SEATS

  const selectSeat = (movieHallId, selectedTime) => {
    setSlotTime(selectedTime);
    let time = ticket.find(t => t.movieHallId === movieHallId).seats[0].time;
    storeTime(time);
    navigate(`/seatSelection/${city}/${movieHallId}/${id}/${title}/${language}/${format}/${movieHallDate}`);
  }


  // -------------------------------------------------------------- HANDLING DATES MOVEMENT

  const moveRight = () => {
    let newStartDateIndex = startDateIndex + 1;
    if (newStartDateIndex <= ticket.length - 1)
      setStartDateIndex(newStartDateIndex)
  };

  const moveLeft = () => {
    let newStartDateIndex = startDateIndex - 1;
    if (newStartDateIndex >= 0) {
      setStartDateIndex(newStartDateIndex)
    } else {
      setStartDateIndex(0)
    }
  };


  const handleSelectedDate = (year, month, date) => {
    setSelectedDate(new Date(`${year} ${month} ${date}`))
    let nextDate = new Date(`${year}-${month}-${date}`)
    let dateStr = formattingDate(nextDate);
    setMovieHallDate(dateStr);
  }


  // -------------------------------------------------------------- DISPLAYING MOVIE NAME & IT'S GENRE

  const header = () => {
    return (
      <div className='buytickets-header px-5'>
        <h1 className='text-light'>{title} - {language}</h1>
        <div>
          {
            genre?.split(", ").map(g => <span key={g} className='text-info badge border border-secondary rounded-pill mx-1 px-2'>{g}</span>)
          }
        </div>
      </div>
    )
  }


  // -------------------------------------------------------------- GETTING MOVIE DATES IN FORMAT

  const gettingDate = (curDate, incDateBy) => {
    let nextDate = new Date(curDate);
    nextDate.setDate(nextDate.getDate() + incDateBy);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[nextDate.getMonth()];
    const day = days[nextDate.getDay()];
    const date = nextDate.getDate();
    const year = nextDate.getFullYear();
    return (
      <>
        <div className={`d-flex flex-column border border-dark rounded rounded-3 ${nextDate.getDate() === selectedDate.getDate() && 'bg-danger text-light shadow-lg '} buytickets-movie-date`} onClick={() => handleSelectedDate(year, month, date)}>
          <div>{day}</div>
          <div>{`${date < 9 ? '0' + date : date}`}</div>
          <div>{month}</div>
        </div>
      </>
    )
  }


  // -------------------------------------------------------------- DISPLAYING MOVIE DATES

  const displayingMovieDates = () => {
    return (
      <>
        <div className="row">
          <div className='d-flex align-items-center gap-3 buytickets-movie-date-container'>
            <div><i type="button" className="bi bi-chevron-left fs-4 text-body-tertiary" onClick={moveRight}></i></div>
            <div className="d-flex gap-1 text-center overflow-hidden">
              {
                ticket.length > 0 ?
                  ticket.slice(startDateIndex, startDateIndex + ticket.length).map((_, i) =>
                    gettingDate(new Date(), startDateIndex + i))
                  : (
                    <div className='fs-5 fw-bold text-danger w-100'>No Dates Available</div>
                  )
              }
            </div>
            <div><i type="button" className="bi bi-chevron-right fs-4 text-body-tertiary" onClick={moveLeft}></i></div>
          </div>
        </div>
      </>
    )
  }


  // -------------------------------------------------------------- DISPLAYING DATE & FILTERS


  const movieInfo = () => {
    return (
      <div className='bg-light px-5 rounded rounded-top-0 d-flex align-items-center buytickets-movie-info'>
        <div className='flex-fill'>{displayingMovieDates()}</div>
        <div type="button" className='ms-auto border-start border-end px-4'>{language} - {format}</div>
        <MyPopover filterName="Filter Price Range" filters={filters} setFilters={setFilters} />
        <MyPopover filterName="Filter Show Timing" filters={filters} setFilters={setFilters} />

      </div >
    )
  }


  // -------------------------------------------------------------- DISPLAYING TOOLTIP CONTENT

  const tooltipContent = (availability) => {
    return (
      <>
        <div className='d-flex gap-4'>
          {
            availability.map(a =>
              <div className='buytickets-movie-hall-availability'>
                <div className='fs-6 fw-bold'>Rs. {a.price}</div>
                <div className='text-center'>{a.type}</div>
                <div className='text-center'>
                  <span className='text-center bg-dark fw-bold badge'>Available</span>
                </div>
              </div>
            )
          }
        </div>
      </>
    )
  }


  // -------------------------------------------------------------- MOVIE HALLS

  const movieHalls = () => {
    return (
      <div>
        <div className="row">
          <div className='d-flex gap-3 justify-content-end font-monospace buytickets-movie-info'>
            <div className='d-flex  gap-2 align-items-center'>
              <span className='fs-5 buytickets-movie-hall-available'>•</span>
              <span>AVAILABLE</span>
            </div>
            <div className='d-flex  gap-2 align-items-center'>
              <span className='fs-5 buytickets-movie-hall-isCancellable'>•</span>
              <span>FAST FILLING</span>
            </div>
            <div className='d-flex gap-1 align-items-center'>
              <span className='border border-dark rounded-0 p-0 px-1 badge text-danger'>LAN</span>
              <span>SUBTITLE LANGUAGE</span>
            </div>
          </div>
        </div>
        <div className="row">
          {
            ticket.length > 0 ?
              ticket.map((t, i) => (
                <div className='d-flex buytickets-movie-hall-name border-top p-0 py-3'>
                  <div className='text-center buytickets-movie-hall-heart'>
                    <i className="bi bi-heart text-muted fs-6"></i>
                  </div>
                  <div className='lh-lg'>
                    <span type="button" className='fw-bold' onClick={() => selectSeat(t.movieHallId, t?.seats[0]?.time)}>{t.movieHall}</span>
                    <div className='d-flex gap-3'>
                      <span className='buytickets-movie-hall-mticket'>
                        <i className="bi bi-phone"></i>M-Ticket
                      </span>
                      <span className='buytickets-movie-hall-food'>
                        <FastfoodTwoToneIcon fontSize='' /> Food & Beverage
                      </span>
                    </div>
                  </div>
                  <div className='d-flex gap-1 mt-1 justify-content-center text-muted buytickets-movie-hall-info'>
                    <i className="bi bi-info-circle"></i>
                    <span>INFO</span>
                  </div>
                  <div className='mt-2'>
                    <div className='d-flex gap-3 flex-wrap buytickets-movie-hall-time'>
                      {
                        t?.seats.map(s => <Tooltip TransitionComponent={Zoom} title={tooltipContent(s.availability)} placement="top" disableInteractive>
                          <button className='btn btn-outline-success rounded-1 px-4 py-2' onClick={() => selectSeat(t.movieHallId, s.time)}>{s.time}</button>
                        </Tooltip>
                        )
                      }
                    </div>
                    <div className='d-flex gap-2 align-items-center'>
                      <span className='fs-5 buytickets-movie-hall-isCancellable'>•</span>
                      <span>{t.isCancellable ? 'Cancellation Available' : 'Non-cancellable'}</span>
                    </div>
                  </div>
                </div>
              ))
              : (
                <div className='alert alert-danger fw-bold text-center fs-3' role='alert'>NO MOVIE HALL FOUND </div>
              )
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">{header()}</div>
        <div className="row px-5">{movieInfo()}</div>
      </div>
      <div className="container bg-light mt-3">
        <div className="row">{movieHalls()}</div>
      </div>
    </>
  )
}

export default BuyTickets;

