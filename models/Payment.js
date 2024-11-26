const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  paymentDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Success', 'Failed'], default: 'Success' },
});

module.exports = mongoose.model('Payment', paymentSchema);
