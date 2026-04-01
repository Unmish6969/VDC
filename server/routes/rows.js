const express = require('express');
const router = express.Router();
const {
  getRows,
  createRow,
  evaluateRow,
  deleteRow,
} = require('../controllers/rowController');

router.get('/rows', getRows);
router.post('/rows', createRow);
router.post('/evaluate', evaluateRow);
router.delete('/rows/:id', deleteRow);

module.exports = router;
