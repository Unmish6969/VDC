const Row = require('../models/Row');

// GET /api/rows — fetch all rows (called once on page load)
const getRows = async (req, res, next) => {
  try {
    const rows = await Row.find().sort({ createdAt: 1 });
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// POST /api/rows — create a blank row
const createRow = async (req, res, next) => {
  try {
    const row = await Row.create({
      description: req.body.description || '',
      valueA:      req.body.valueA      ?? 0,
      valueB:      req.body.valueB      ?? 0,
      formula:     req.body.formula     || '',
    });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
};

// PUT /api/rows/:id — persist raw input fields only (debounced from frontend)
const updateRow = async (req, res, next) => {
  try {
    const { description, valueA, valueB, formula } = req.body;
    const row = await Row.findByIdAndUpdate(
      req.params.id,
      { description, valueA, valueB, formula },
      { new: true, runValidators: true }
    );
    if (!row) {
      const err = new Error('Row not found');
      err.status = 404;
      return next(err);
    }
    res.json(row);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/rows/:id
const deleteRow = async (req, res, next) => {
  try {
    await Row.findByIdAndDelete(req.params.id);
    res.json({ message: 'Row deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRows, createRow, updateRow, deleteRow };
