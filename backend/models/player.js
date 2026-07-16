const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  torneopalId: { type: String, required: true, unique: true },
}, {
  strict: false,
  timestamp: true,
});

module.exports = mongoose.model('Player', playerSchema);
