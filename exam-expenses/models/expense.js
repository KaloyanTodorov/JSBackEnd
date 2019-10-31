const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: [true, "Merchant is required"]
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  total: {
    type: mongoose.SchemaTypes.Number,
    require: [true, "Total is required"]
  },
  category: {
    type: mongoose.SchemaTypes.String,
    required: [true, "Category is required"]
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: [true, "Description is required"],
    minlength: [10, "Description should be at least 10 characters long"],
    maxlength: [50, "Description should be 50 characters max"]
  },
  report: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
    required: [true, "Report is required"]
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Expense', expenseSchema);