const mongoose = require('mongoose');

const rowSchema = new mongoose.Schema(
  {
    description: { type: String, default: '' },
    valueA:      { type: Number, default: 0 },
    valueB:      { type: Number, default: 0 },
    formula:     { type: String, default: '' },
    // result is intentionally NOT stored — computed on the frontend only
  },
  { timestamps: true }
);

module.exports = mongoose.model('Row', rowSchema);
