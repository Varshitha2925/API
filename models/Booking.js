const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seats: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);
