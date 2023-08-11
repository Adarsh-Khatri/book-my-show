const tickets = require("../data/tickets");




function convertToMinutes(time) {
  const [timeValue, period] = time.split(' ');
  const [hours, minutes] = timeValue.split(':').map(Number);
  return period === 'PM' ? (hours % 12 + 12) * 60 + minutes : hours * 60 + minutes;
}



function isTimeInRange(time, ranges) {
  const timeValue = convertToMinutes(time);
  for (const [start, end] of ranges) {
    const startTimeValue = convertToMinutes(start);
    const endTimeValue = convertToMinutes(end);

    if (timeValue >= startTimeValue && timeValue <= endTimeValue) {
      return true;
    }
  }
  return false;
}


function isPriceInRange(price, ranges) {
  return ranges.some(([min, max]) => price >= min && price <= max);
}



const getTicketByMovieImdbId = async (req, res) => {

  let { imdbID } = req.params;
  let { price, time } = req.query;

  console.log(req.query);

  let ticket = tickets.find(ticket => ticket.imdbID === imdbID);
  if (!ticket) {
    return res.status(404).send("Ticket Not Found By Id")
  }
  let info = ticket.info;


  // MAKING PRICE ARRAY

  let priceArr = price?.split(',')
    .map(price => price.split("-"))
    .map(price => [+price[0], +price[1]]);


  // MAKING TIME ARRAY

  let timeArr = time?.split(",")
    .map(time => time.split("-"))
    .map(time => [time[1].includes("AM") ? `${time[0]} AM` : `${time[0]} PM`, time[1]]);

  let info1 = price ?
    info.map(movie => ({
      ...movie,
      seats: movie.seats
        .map(showtime => ({
          ...showtime,
          availability: showtime.availability.filter(availability =>
            isPriceInRange(availability.price, priceArr)
          )
        }))
        .filter(showtime => showtime.availability.length > 0)
    }))
    : info;


  let info2 = time ?
    info1.map(movie => ({
      ...movie,
      seats: movie.seats.filter(showtime =>
        isTimeInRange(showtime.time, timeArr)
      )
    }))
    : info1;


  let info3 = info2.filter(movie => movie.seats.length > 0)


  return res.status(200).json(info3);

}






const getTicketByMovieImdbIdAndMovieHallId = async (req, res) => {
  let { imdbID, movieHallId } = req.params;
  let ticket = tickets.find(ticket => ticket.imdbID === imdbID);
  if (!ticket) {
    return res.status(404).send("Ticket Not Found By Id")
  }
  let info = ticket?.info;
  let movieHall = info.find(i => i.movieHallId === movieHallId);
  if (!movieHall) {
    return res.status(404).send("Movie Hall Not Found By Id")
  }
  return res.status(200).json(movieHall);
}






module.exports = { getTicketByMovieImdbId, getTicketByMovieImdbIdAndMovieHallId }