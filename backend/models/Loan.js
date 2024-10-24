const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
  repaymentProgress: { type: Number, default: 0 },
});

module.exports = mongoose.model('Loan', LoanSchema);
