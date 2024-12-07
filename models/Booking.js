const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String},
  no_of_tickets: { type: Number, required: true },
  totalPrize: { type: Number, required: true },
  booking_status: { type: String},
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
  createdAt: { type: Date},
  id:{type: String}
});

module.exports = mongoose.model('Booking', bookingSchema);
