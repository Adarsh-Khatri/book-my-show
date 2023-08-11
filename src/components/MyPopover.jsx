import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';


// 1. PASS FILTERS ARRAY TO PARENT COMPONENT AND SET PARAMS IN PARENT COMPONENT
// 2. AND HANDLE VALUE HERE ONLY


function MyPopover({ filterName, filters, setFilters }) {


  // --------------------------------------------------------------------------------- FILTERS ARRAY

  const filterPrice = ["0-100", "101-300", "301-500", "501-800", "801-1000", "1001-1500"];

  const filterTime = ["12:00-11:59 AM", "12:00-03:59 PM", "04:00-06:59 PM", "07:00-11:59 PM"];


  const handleChange = ({ currentTarget }) => {
    let { name, value, checked } = currentTarget;
    setFilters(prevFilters => {
      let updatedFilters;
      if (checked) {
        updatedFilters = { ...prevFilters, [name]: prevFilters[name].concat(value) };
      } else {
        updatedFilters = { ...prevFilters, [name]: prevFilters[name].filter(item => item !== value) };
      }
      return updatedFilters;
    });
  }


  // ---------------------------------------------------------------------------------- COPIED FROM MATERIAL UI 

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const formattingTime = (time, i) => {
    let str = i === 0 ? "Morning" : i === 1 ? "Afternoon" : i === 2 ? "Evening" : "Night";
    return (
      <div>
        <span>{str}</span>
        <span>{time}</span>
      </div>
    )
  }

  return (
    <div>
      <div type="button" className='border-end px-4' aria-describedby={id} variant="contained" onClick={handleClick}>
        {filterName}
      </div>

      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* <Typography sx={{ p: 1 }}>The content</Typography> */}
        {
          filterName.includes("Price") ?
            (
              <div className='mypopover-price'>
                {
                  filterPrice.map(price =>
                    <div key={price} className="form-group">
                      <input type="checkbox" className='form-check-input' name='price' id={price} value={price} checked={filters?.price?.findIndex(item => item === price) >= 0} onChange={handleChange} />
                      <label className='form-check-label' htmlFor={price}>Rs. {price}</label>
                    </div>
                  )
                }
              </div>
            )
            :
            (
              <div className='mypopover-time'>
                {
                  filterTime.map((time, i) =>
                    <div key={time} className="form-group">
                      <input type="checkbox" className='form-check-input' name='time' id={time} value={time} checked={filters?.time?.findIndex(item => item === time) >= 0} onChange={handleChange} />
                      <label className='form-check-label' htmlFor={time}>{formattingTime(time, i)}</label>
                    </div>
                  )
                }
              </div>
            )
        }

      </Popover>

    </div>
  );
}


export default MyPopover;