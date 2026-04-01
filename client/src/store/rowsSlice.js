import { createSlice } from '@reduxjs/toolkit';
import { evaluateFormula } from '../utils/evaluateFormula';

/** Compute the result for a single row object */
function computeResult(row) {
  const res = evaluateFormula(row.valueA, row.valueB, row.formula);
  return res.error !== undefined ? res.error : res.value;
}

const rowsSlice = createSlice({
  name: 'rows',
  initialState: [],
  reducers: {
    // Called once on mount after GET /api/rows
    setRows(state, action) {
      return action.payload.map((row) => ({
        ...row,
        result: computeResult(row),
      }));
    },

    // Called after POST /api/rows returns the new blank doc
    addRow(state, action) {
      state.push({
        ...action.payload,
        result: computeResult(action.payload),
      });
    },

    // Called on every keystroke — updates field + recomputes result immediately
    updateRow(state, action) {
      const { id, field, value } = action.payload;
      const row = state.find((r) => r._id === id);
      if (!row) return;
      row[field] = value;
      row.result = computeResult(row);
    },

    // Called after DELETE /api/rows/:id
    deleteRow(state, action) {
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { setRows, addRow, updateRow, deleteRow } = rowsSlice.actions;
export default rowsSlice.reducer;
