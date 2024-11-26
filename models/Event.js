const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number },
  date: { type: Date, required: true },
  duration: { type: Number }, // in hours
  type: { type: String, enum: ['Paid', 'Limited Free', 'Unlimited Free'], required: true },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
