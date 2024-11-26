const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  role: { type: String },},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userSchema);
