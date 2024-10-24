const Mentor = require('../models/Mentor');

// Get all available mentors/mentees
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ role: 'Mentor', status: 'Available' });
    res.json(mentors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sign up as a mentor or mentee
exports.signupMentorship = async (req, res) => {
  const { role, expertise } = req.body;
  try {
    const mentorship = new Mentor({
      user: req.user.id,
      role,
      expertise,
    });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Match mentors with mentees
exports.matchMentor = async (req, res) => {
  const { mentorId, menteeId } = req.body;
  try {
    const mentor = await Mentor.findById(mentorId);
    const mentee = await Mentor.findById(menteeId);
    if (!mentor || !mentee) return res.status(404).json({ message: 'Mentor/Mentee not found' });

    mentor.matches.push(mentee.user);
    mentee.matches.push(mentor.user);
    await mentor.save();
    await mentee.save();
    res.json({ message: 'Mentor and Mentee matched successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
