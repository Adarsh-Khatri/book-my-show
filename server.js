const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 2410;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));



// ----------------------------------------------------------------------------------- IMPORTING REQUIRED FILES



const { getAllMovies, getMovieByImdbId, movieBookingDone } = require('./controllers/movieController.js');
const { getTicketByMovieImdbId, getTicketByMovieImdbIdAndMovieHallId } = require("./controllers/ticketController.js");
const { getSeatsByMovieHallId } = require('./controllers/seatController.js');
const { login, getUserById, updateUserById } = require('./controllers/userController.js');
const { getBookingById } = require('./controllers/bookingController.js');




// ----------------------------------------------------------------------------------------------- MOVIES



// @ GET
// @ ROUTE: /movies/:city
app.get('/movies/:city', getAllMovies)


// @ GET
// @ ROUTE: /movies/:city/:imdbID
app.get('/movies/:city/:imdbID', getMovieByImdbId)


// @ POST
// @ ROUTE: /movieBookingDone
app.post('/movieBookingDone', movieBookingDone)




// ----------------------------------------------------------------------------------------------- TICKET



// @ GET
// @ ROUTE: /buytickets/:imdbID
app.get('/buytickets/:city/:imdbID', getTicketByMovieImdbId)


// @ GET
// @ ROUTE: /movieHallDetails/:city/:imdbID/:movieHallId
app.get('/movieHallDetails/:city/:imdbID/:movieHallId', getTicketByMovieImdbIdAndMovieHallId)




// ----------------------------------------------------------------------------------------------- SEATS




// @ GET
// @ ROUTE: /seatSelection/:city/:imdbID/:movieHallId
app.get('/seatSelection/:time/:movieHallId/', getSeatsByMovieHallId)



// ----------------------------------------------------------------------------------------------- USER




// @ POST
// @ ROUTE: /login
app.post('/login', login)


// @ GET
// @ ROUTE: /getUserById/:userId
app.get('/getUserById/:userId', getUserById)


// @ PUT
// @ ROUTE: /updateUserById/:userId
app.put('/updateUserById/:userId', updateUserById)




// ----------------------------------------------------------------------------------------------- BOOKING



// @ GET
// @ ROUTE: /getBookingById
app.get('/getBookingById/:userId', getBookingById)





