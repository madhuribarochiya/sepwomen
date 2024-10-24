const Loan = require('../models/Loan');

// Apply for loan
exports.applyLoan = async (req, res) => {
  const { amount } = req.body;
  try {
    const loan = new Loan({ amount, user: req.user.id });
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get loan status
exports.getLoanStatus = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    res.json(loans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
