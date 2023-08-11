import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApi } from '../services/httpServices';
import { DIV } from '../styledComponent/styledPoster';
import Navbar from './Navbar';


function MovieDetails() {

  let { imdbID, city } = useParams();
  const [movie, setMovie] = useState("");

  const [ticket, setTicket] = useState({ language: "", format: "" })

  const navigate = useNavigate();

  const fetchData = async () => {
    let data = await getApi(`/movies/${city}/${imdbID}`);
    setMovie(data);
  }

  useEffect(() => {
    fetchData()
  }, [])


  const updatingInfo = (runtime, genre, rated, released) => {
    let arr = [runtime, genre, rated, released];
    return (
      <>
        {
          arr.join(" • ")
        }
      </>
    )
  }

  const handlingChange = ({ currentTarget }) => {
    let { name, value } = currentTarget;
    setTicket(pre => ({ ...pre, [name]: value }))
  }

  const handleProceed = () => {
    if (ticket.language && ticket.format) {
      return navigate(`/movies/buytickets/${city}/${movie.imdbID}/${movie.Title}/${ticket.language}/${ticket.format}`)
    }
    setTicket({ language: "", format: "" });
    return alert('Please Select Both Language | Format')
  }

  const creatingButtons = (arr, name1, selValue) => {
    return (
      <div className='form-check px-5 text-center'>
        {
          arr?.split(", ").map(a =>
            <>
              <input type="radio" className="btn-check" id={a} name={name1} value={a} checked={selValue === a} onChange={handlingChange} />
              <label className="btn btn-outline-danger w-100 mb-1 modal-btn fw-bold" htmlFor={a}>{a}</label>
            </>
          )
        }
      </div>
    )
  }

  const movieMain = () => {
    return (
      <>
        <DIV className='movie-main p-3 mb-4 shadow-lg rounded rounded-5 rounded-top-0' bg={movie?.Images && movie?.Images[0]}>
          <div className="row">
            <div className="col-md-3 pb-3 text-end">
              <div className="movie-detail-poster-container text-end d-flex flex-column align-items-end">
                <div className='movie-detail-img-container p-0 m-0'>
                  <img type="button" src={movie.Poster} alt={movie.Title} className='movie-detail-img rounded rounded-bottom-0 p-0 m-0' />
                </div>
                <div className='movie-details-img-footer text-light border-top rounded rounded-top-0'>
                  <div className='text-center'>In Cinemas</div>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-light">
              <div>
                <h3 className='fs-1 fw-bold'>{movie.Title}</h3>
                <h4 className='d-flex gap-2 align-items-baseline mb-3 movie-detail-votes'>
                  <i className="bi bi-star-fill movie-detail-star"></i>
                  <span>{movie.imdbRating}/10</span>
                  <span className='movie-votes'> {movie.imdbVotes} Votes
                    <i className="bi bi-chevron-right ms-1 votes-right-chevron"></i>
                  </span>
                </h4>
                <div className='movie-detail-rating rounded rounded-3'>
                  <div className="row p-3 text-light align-items-center">
                    <div className="col-md-7">
                      <h5>Add you rating & review</h5>
                      <div>Your ratings matter</div>
                    </div>
                    <div className="col-md-5 text-end ">
                      <button type='button' className='btn btn-md text-dark fs-5 fw-bold bg-light'>Rate now</button>
                    </div>
                  </div>
                </div>
                <div className='d-flex gap-2 my-3'>
                  <button type='button' className='btn btn-light text-dark'>{movie?.Format}</button>
                  <button type='button' className='btn btn-light text-dark'>{movie?.Language}</button>
                </div>
                <div className='my-4'>
                  <div className='fw-bold'>
                    {updatingInfo(movie.Runtime, movie.Genre, movie.Rated, movie.Released)}
                  </div>
                </div>
                <div className='mt-5'>
                  <div className='d-flex justify-content-between'>
                    {/* --------------------------------------------------------------- Button Trigger Modal */}
                    <button type='button' className='btn btn-lg btn-danger px-5' data-bs-toggle="modal" data-bs-target="#BookTickets">Book tickets</button>
                    <div type="button" className='btn text-light d-flex gap-3 align-items-center p-2 border rounded rounded-3 px-4 lead'>
                      <i className="bi bi-share"></i>
                      <span className='fw-bold'>Share</span>
                    </div>
                  </div>


                  {/* --------------------------------------------------------------- Modal  */}

                  <div className="modal fade" id="BookTickets" tabindex="-1" aria-labelledby="BookTicketsLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                      <div className="modal-content">
                        <div className="modal-body text-dark">
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <div className='mb-2'>SELECT LANGUAGE</div>
                              {creatingButtons(movie?.Language, "language", ticket.language)}
                            </div>
                            <div className="col-md-12 text-center">
                              <div className='mb-2'>SELECT FORMAT</div>
                              {creatingButtons(movie?.Format, "format", ticket.format)}
                            </div>
                            <div className="col-md-12 mt-2 text-center">
                              <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={handleProceed}>Proceed</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DIV >
      </>
    )
  }

  const movieInfo = () => {
    let actors = movie?.Actors?.split(", ");
    return (
      <div className='row'>
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <h3 className='fw-bold'>About The Movie</h3>
          <p className=''>{movie?.Plot}</p>
          <hr />
          <h3 className='fw-bold'>Cast</h3>
          <p className='d-flex justify-content-between'>
            {
              actors?.map(act => <span>{act}</span>)
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {movieMain()}
      </div>
      <div className="row w-75">
        {movieInfo()}
      </div>
    </div>
  )
}

export default MovieDetails