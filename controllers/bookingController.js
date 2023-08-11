const bookings = require("../data/bookings.js")


module.exports.getBookingById = (req, res) => {

  let { userId } = req.params;

  let booking = bookings.find(booking => booking.bookingId === userId);

  if (!booking) {
    return res.status(404).send("Booking Not Found");
  }

  let userbooking = booking.allBookings;

  return res.status(200).json(userbooking);

}