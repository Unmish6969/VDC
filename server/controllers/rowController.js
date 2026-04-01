const Row = require('../models/Row');

// GET /api/rows — fetch all rows
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
      result:      null,
    });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
};

// POST /api/evaluate — evaluate formula and persist result
const evaluateRow = async (req, res, next) => {
  try {
    const { id, valueA, valueB, formula } = req.body;

    let result;
    try {
      // eslint-disable-next-line no-new-func
      const val = new Function('A', 'B', 'return ' + formula)(
        parseFloat(valueA),
        parseFloat(valueB)
      );
      if (!isFinite(val)) {
        result = 'Result is not finite';
      } else {
        result = val;
      }
    } catch {
      result = 'Invalid formula';
    }

    // Persist updated result to MongoDB
    if (id) {
      await Row.findByIdAndUpdate(id, {
        valueA: parseFloat(valueA),
        valueB: parseFloat(valueB),
        formula,
        result,
      });
    }

    if (typeof result === 'string') {
      return res.json({ error: result });
    }
    res.json({ result });
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

module.exports = { getRows, createRow, evaluateRow, deleteRow };
