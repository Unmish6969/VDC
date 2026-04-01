const mongoose = require('mongoose');

const rowSchema = new mongoose.Schema(
  {
    description: { type: String, default: '' },
    valueA:      { type: Number, default: 0 },
    valueB:      { type: Number, default: 0 },
    formula:     { type: String, default: '' },
    result:      { type: mongoose.Schema.Types.Mixed, default: null },
    // result is computed on frontend and saved only when user clicks Submit
  },
  { timestamps: true }
);

module.exports = mongoose.model('Row', rowSchema);
