import React, { useContext, useEffect, useState } from 'react';
import { getApi } from '../services/httpServices';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MyCityContext, MySearchContext } from './MainComponent';

function ShowMovies(props) {

  // ------------------------------------------------------------------------------- DESTRUCTURING PROPS

  const { filters } = props;

  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();


  // ------------------------------------------------------------------------------- CONTEXT 

  const { search } = useContext(MySearchContext);

  const { city } = useContext(MyCityContext);


  // ------------------------------------------------------------------------------- URL PARAMS 

  const [searchParams, setSearchParams] = useSearchParams();

  const makeSearchString = (str, key, value) => {
    return (value.length !== 0 ? str ? `${str}&${key}=${value.join(',')}` : `?${key}=${value.join(',')}` : str)
  }

  const makeQueryParams = (filters) => {
    let str = search ? `?searchTitle=${search}` : "";
    Object.entries(filters).forEach(([key, value]) => {
      str = makeSearchString(str, key, value)
    })
    return str;
  };

  const fetchData = async () => {
    let queryParams = makeQueryParams(filters)
    setSearchParams(queryParams);
    let data = await getApi(`/movies/${city}/${queryParams}`);
    setMovies(data);
  }

  useEffect(() => {
    fetchData()
  }, [filters, search]);

  const displayMovies = (movie) => {
    return (
      <div className="row my-5 p-0 m-0">
        <div type="button" className="card movie-img-container p-0" onClick={() => navigate(`/movies/movieDetails/${city}/${movie.imdbID}/${movie.Title}`)} >
          <div className="movie-poster-container">
            <img src={movie.Poster} className="card-img-top movie-img" alt={movie.Title} />
          </div>
          <div className="card-footer movie-img-footer">
            <div className="text-light d-flex gap-2 align-items-baseline">
              <i className="bi bi-star-fill text-danger"></i>
              <span>{movie.imdbRating}/10</span>
              <span className='movie-votes'> {movie.imdbVotes} Votes</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatGenre = (genre) => {
    let genreArr = genre.split(', ');
    let genreWithSlash = genreArr.join('/')
    return genreWithSlash;
  }

  return (
    <div className="container">
      <div className="row my-3">
        <h3 className='alert alert-info fw-bold text-center' role='alert'>New Releases</h3>
      </div>
      <div className="row">
        {
          movies.length > 0
            ? movies.map((movie, i) => (
              <div key={`${i}`} className="col-md-3">
                <div>
                  {displayMovies(movie)}
                  <div className='movie-info'>
                    <h4 >{movie.Title}</h4>
                    <div>{formatGenre(movie.Genre)}</div>
                  </div>
                </div>
              </div>
            ))
            : (<h4 className='text-danger text-center fw-bold'>No Movie Found</h4>)
        }
      </div>
    </div>
  )
}

export default React.memo(ShowMovies);