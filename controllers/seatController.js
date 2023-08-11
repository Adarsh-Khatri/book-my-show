const seats = require('../data/seats.js');



const getSeatsByMovieHallId = async (req, res) => {
  // let { city, imdbID, movieHallId, time } = req.params;
  let { movieHallId, time } = req.params;
  let seatingArrangement = seats.find(s => s.id === movieHallId);
  if (!seatingArrangement) {
    return res.status(404).send("Movie Hall Seating Arrangement Not Found By Movie Hall Id")
  }
  let seatingArangementArr = seatingArrangement.seatsArr;
  let data = seatingArangementArr.find(seat => seat.time === time).seatAllocation;
  return res.status(200).json(data)
}



module.exports = { getSeatsByMovieHallId }