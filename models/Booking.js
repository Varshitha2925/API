const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  no_of_tickets: { type: Number, required: true },
  totalPrize: { type: Number, required: true },
  booking_status: { type: String},
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);