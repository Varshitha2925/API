const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number },
  startdate: { type: Date},
  enddate: { type: Date, },
  startTime:{ type: String },
  endTime:{ type: String },
  duration: { type: String }, // in hours
  type: { type: String, required: true },
  price: { type: Number, default: 0 },
  ticketSold: {type:Number},
  id: {type:String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
