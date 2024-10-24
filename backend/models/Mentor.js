const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Mentor or mentee
  role: { type: String, enum: ['Mentor', 'Mentee'], required: true }, // Mentor or Mentee
  expertise: { type: String, required: true }, // Expertise area for mentors or learning needs for mentees
  status: { type: String, default: 'Available' },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Mentees for mentors or vice-versa
});

module.exports = mongoose.model('Mentor', MentorSchema);
