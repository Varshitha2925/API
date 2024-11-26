const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  capacity: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  ticketLimit: { type: Number, required: true },
  eventType: { 
    type: String, 
    enum: ['Paid', 'LimitedFree', 'UnlimitedFree'], 
    required: true 
  },
  ticketPrice: { type: Number, required: function () { return this.eventType === 'Paid'; } },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
});

module.exports = mongoose.model('Event', eventSchema);
