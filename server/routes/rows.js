const express = require('express');
const router = express.Router();
const { getRows, createRow, updateRow, deleteRow } = require('../controllers/rowController');

router.get('/rows', getRows);
router.post('/rows', createRow);
router.put('/rows/:id', updateRow);
router.delete('/rows/:id', deleteRow);

module.exports = router;
