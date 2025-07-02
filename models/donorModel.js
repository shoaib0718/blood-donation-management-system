const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  lastDonation: { type: Date },
});

module.exports = mongoose.model('Donor', donorSchema);
