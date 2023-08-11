import React, { useState } from 'react';

function LeftPanelFilter(props) {

  const { filters, setFilters } = props;

  const [arrow, setArrow] = useState({ Languages: false, Genres: false, Format: false })


  // -------------------------------------------------------------- Filter Array Data
  const languagesArr = ["Hindi", "English", "Spanish", "Russian", "Mandarin", "Tamil", "Telugu", "Malayalam", "Korean", "French", "Japenese", "Punjabi", "English 7D"];
  const genresArr = ["Action", "Drama", "Thriller", "Comedy", "Crime", "Fantasy", "Animation", "Romantic", "Horror", "Mystery", "Sci-Fi", "Adventure", "Biography", "History", "Musical", "Period", "Anime", "Family"];
  const formatArr = ["2D", "3D", "ICE 3D", , "4DX", "7D", "IMAX 2D", "IMAX 3D", "ICE", "MX4D 3D", "MX4D 2D", "2D Screen X", "3D Screen X"];


  // -------------------------------------------------------------- Resetting All Filters 
  const resettingFilters = () => {
    setFilters({ Languages: [], Genres: [], Format: [] });
    window.location.reload()
  }


  // -------------------------------------------------------------- Resetting Filters Seperately 
  const clearingSeperately = (name) => {
    setFilters(pre => ({ ...pre, [name]: [] }))
  }


  // -------------------------------------------------------------- Handling Filters Change

  const handleChange = ({ currentTarget }) => {
    const { name, value, checked } = currentTarget;
    setFilters(prevFilters => {
      let updatedFilters;
      if (checked) {
        updatedFilters = { ...prevFilters, [name]: prevFilters[name].concat(value) };
      } else {
        updatedFilters = { ...prevFilters, [name]: prevFilters[name].filter(item => item !== value) };
      }
      return updatedFilters;
    });
  };


  // ---------------------------------------------------------------- Expanding Arrow
  const handlingArrow = (name) => {
    setArrow(pre => ({ ...pre, [name]: !pre[name] }))
  }


  const collapseFilter = (name, arr, selArr) => {
    return (
      <>
        <div className="row my-1 mx-auto">
          <p className='border d-flex justify-content-between rounded align-items-center'>
            <div type="button" className='w-100 d-flex gap-2' data-bs-toggle="collapse" data-bs-target={`#${name}`} aria-expanded="false" aria-controls={name} onClick={() => handlingArrow(name)}>
              <span><i className={`bi bi-chevron-${arrow[name] ? 'up' : 'down'} filter-arrow`}></i></span>
              <span className={`lead fw-bold ${arrow[name] ? 'text-danger' : 'text-dark'}`}>{name}</span>
            </div>
            <p type="button" className='text-muted h-25' onClick={() => clearingSeperately(name)}>Clear</p>
          </p >
          <div className="collapse" id={name}>
            <div className="border rounded p-3 filters gap-2">
              {
                arr.map(a =>
                  <div className='p-0 m-0 border' aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id={a} name={name} value={a} checked={selArr?.findIndex(item => item === a) >= 0} autoComplete="off" onChange={handleChange} />
                    <label className="btn btn-outline-danger btn-sm" htmlFor={a}>{a}</label>
                  </div>
                )
              }
            </div>
          </div >
        </div >
      </>
    )
  }

  return (
    <div className="container border rounded rounded-3 my-3 ">
      <div className="row my-3">
        <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
          <h2 className='fw-bold'>Filters</h2>
          <div type="button" className='text-danger fw-bold' onClick={resettingFilters}>Reset Filter</div>
        </div>
      </div>
      <div className="row">
        {collapseFilter("Languages", languagesArr, filters.Languages)}
      </div>
      <div className="row">
        {collapseFilter("Genres", genresArr, filters.Genres)}
      </div>
      <div className="row">
        {collapseFilter("Format", formatArr, filters.Format)}
      </div>
    </div>
  )
}

export default React.memo(LeftPanelFilter);




