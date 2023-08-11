const movies = require("../data/movies.js");
const seats = require("../data/seats.js");
const bookings = require("../data/bookings.js");


const filterMoviesFun = (filterMovies, field, optionsArr) =>
  filterMovies.filter(movie => {
    let movieArr = movie[field].split(", ");
    let arr = optionsArr.split(",");
    return movieArr.findIndex(mov => arr.indexOf(mov) >= 0) >= 0;
  })


module.exports.getAllMovies = (req, res) => {
  let { searchTitle, Languages, Genres, Format } = req.query;
  let filterMovies = [...movies];

  // ----------------------------------------------------- FILTER MOVIES BY QUERY SEARCH TITLE
  let filterMovies1 = searchTitle ? filterMovies.filter(movie => movie.Title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())) : [...movies]

  // ----------------------------------------------------- FILTER MOVIES BY QUERY LANGUAGES
  let filterMovies2 = Languages ? filterMoviesFun(filterMovies1, "Language", Languages) : [...filterMovies1];

  // ----------------------------------------------------- FILTER MOVIES BY QUERY GENRES
  let filterMovies3 = Genres ? filterMoviesFun(filterMovies2, "Genre", Genres) : [...filterMovies2];

  // ----------------------------------------------------- FILTER MOVIES BY QUERY FORMAT
  let filterMovies4 = Format ? filterMoviesFun(filterMovies3, "Format", Format) : [...filterMovies3];


  return res.status(200).json(filterMovies4)
}




module.exports.getMovieByImdbId = (req, res) => {
  let { imdbID } = req.params;
  let movie = movies.find(movie => movie.imdbID === imdbID);
  if (!movie) {
    return res.status(404).send("Movie Not Found")
  }
  return res.status(200).json(movie)
}







function matchAndReplaceSeats(seats, selectedSeats) {
  let newSeatAllocation = seats.seatAllocation.map(seatAllocate => {
    let seatAllocateArr = seatAllocate.seats;
    let newSeats = seatAllocateArr.map(seat => {
      let seatArr = seat.split(":");
      seatArr = seatArr.map(seat => {
        let index = selectedSeats.findIndex(selSeat => seat.startsWith(selSeat.slice(0, 3)))
        if (index >= 0) {
          return selectedSeats[index];
        }
        return seat;
      })
      return seatArr.join(":");
    })
    return { ...seatAllocate, seats: newSeats }
  })
  return { ...seats, seatAllocation: newSeatAllocation };
}




module.exports.movieBookingDone = (req, res) => {

  let { city, date, format, movieHall, selectedSeats, slotTime, totalPrice, movieHallId, id, title, language, payment, userId } = req.body;

  let seatIndex = seats.findIndex(seat => seat.id === movieHallId);

  if (seatIndex < 0) {
    return res.status(404).send("Movie Hall Not Found")
  }

  // UPDATING SEATING ARRANGEMENT

  let selectedSeatsIndex = seats[seatIndex].seatsArr.findIndex(seat => seat.time === slotTime);

  if (selectedSeatsIndex < 0) {
    return res.status(404).send("Seat Not Found By Slot Time");
  }

  let newSeats = matchAndReplaceSeats(seats[seatIndex].seatsArr[selectedSeatsIndex], selectedSeats);

  seats[seatIndex].seatsArr.splice(selectedSeatsIndex, 1, newSeats);


  // ADDING MOVIE TO USERS BOOKINGS


  let bookingIndex = bookings.findIndex(booking => booking.bookingId === userId);

  let selectedSeats1 = selectedSeats.map(seat => seat.slice(0, 3))

  let bookingData = { movie: `${title}, ${language} - ${format}`, hall: `${movieHall}, ${city}`, amount: totalPrice, seats: selectedSeats1, date, startTime: slotTime, payment };


  if (bookingIndex < 0) {
    bookings.push({ bookingId: userId, allBookings: [bookingData] });
    console.log('DOES NOT EXISTS');
  }
  else {
    bookings[bookingIndex].allBookings.push(bookingData);
    console.log('EXISTS');
  }


  return res.status(201).json({ seats, bookings });
}









// function matchAndReplaceSeats(seats, selectedSeats) {
//   let newSeatAllocation = seats.seatAllocation.map(seatAllocate => {
//     let seatAllocateArr = seatAllocate.seats;
//     let newSeats = seatAllocateArr.map(seat => {
//       let seatArr = seat.split(":");
//       seatArr = seatArr.map(seat => {
//         let index = selectedSeats.findIndex(selSeat => seat.startsWith(selSeat.slice(0, 3)))
//         if (index >= 0) {
//           return selectedSeats[index];
//         }
//         return seat;
//       })
//       return seatArr.join(":");
//     })
//     return { ...seatAllocate, seats: newSeats }
//   })
//   return { ...seats, seatAllocation: newSeatAllocation };
// }




// module.exports.movieBookingDone = (req, res) => {

//   let { city, date, format, movieHall, selectedSeats, slotTime, totalPrice, movieHallId, id, title, language, payment, userId } = req.body;

//   let seatIndex = seats.findIndex(seat => seat.id === movieHallId);

//   if (seatIndex < 0) {
//     return res.status(404).send("Movie Hall Not Found")
//   }


//   // UPDATING SEATING ARRANGEMENT

//   let arr = seats[seatIndex].seatsArr.find(seat => seat.time === slotTime);

//   // let newSeats = matchAndReplaceSeats(seats[seatIndex], selectedSeats)

//   // seats.splice(seatIndex, 1, newSeats);



//   // ADDING MOVIE TO USERS BOOKINGS


//   // let bookingIndex = bookings.findIndex(booking => booking.bookingId === userId);

//   // let selectedSeats1 = selectedSeats.map(seat => seat.slice(0, 3))

//   // let bookingData = { movie: `${title}, ${language} - ${format}`, hall: `${movieHall}, ${city}`, amount: totalPrice, seats: selectedSeats1, date, startTime: slotTime, payment };


//   // if (bookingIndex < 0) {
//   //   bookings.push({ bookingId: userId, allBookings: [bookingData] });
//   // } else {
//   //   bookings[bookingIndex].allBookings.push(bookingData);
//   // }


//   return res.status(201).json({ seats });

// }


