const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  eventId: String
});

module.exports = mongoose.model("Booking", bookingSchema);