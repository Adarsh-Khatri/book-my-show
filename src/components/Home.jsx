import React, { useEffect, useState } from 'react';
import LeftPanelFilter from './LeftPanelFilter';
import ShowMovies from './ShowMovies';
import SlidingImages from './SlidingImages';

function Home(props) {
  // Define the state in the parent component to store the filters
  const [filters, setFilters] = useState({ Languages: [], Genres: [], Format: [] });

  return (
    <div className="container-fluid">
      <div className="row">
        <SlidingImages />
      </div>
      <div className="row bg-light h-100">
        <div className="col-md-3">
          {/* Pass down the state and the function to update it as props to the child component */}
          <LeftPanelFilter filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-md-9">
          <ShowMovies filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default Home;



















// import React, { useState } from 'react';
// import LeftPanelFilter from './LeftPanelFilter';
// import ShowMovies from './ShowMovies';

// function Home() {

//   // const [filteredOptions, setFilteredOptions] = useState(null)

//   const handleFilter = (filter) => {
//     console.log(filter);
//     // setFilteredOptions(filter)
//   }


//   return (
//     <div className="container">
//       <div className="row bg-light h-100">
//         <div className="col-md-3"><LeftPanelFilter handleFilter={handleFilter} /></div>
//         <div className="col-md-9"><ShowMovies filteredOptions={filteredOptions} /></div>
//       </div>
//     </div>
//   )
// }

// export default Home;