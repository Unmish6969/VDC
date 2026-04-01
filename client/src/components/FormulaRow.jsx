import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateRow } from '../store/rowsSlice';
import ResultCell from './ResultCell';

function FormulaRow({ row, onDelete }) {
  const dispatch = useDispatch();
  // Keep a ref to the latest row so the debounce timer always sends fresh data
  const rowRef = useRef(row);
  rowRef.current = row;

  const debounceTimer = useRef(null);

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    const value =
      field === 'valueA' || field === 'valueB'
        ? raw === '' ? '' : parseFloat(raw)
        : raw;

    // 1. Dispatch to Redux immediately → result recomputed in slice
    dispatch(updateRow({ id: row._id, field, value }));

    // 2. Debounce the PUT to backend (500ms after last keystroke)
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const r = rowRef.current;
      axios
        .put(`/api/rows/${r._id}`, {
          description: r.description,
          valueA:      r.valueA,
          valueB:      r.valueB,
          formula:     r.formula,
        })
        .catch((err) => console.error('PUT failed:', err));
    }, 500);
  };

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(debounceTimer.current), []);

  return (
    <tr className="formula-row">
      <td>
        <input
          type="text"
          className="cell-input"
          placeholder="Description…"
          value={row.description}
          onChange={handleChange('description')}
        />
      </td>
      <td>
        <input
          type="number"
          className="cell-input cell-number"
          placeholder="0"
          value={row.valueA}
          onChange={handleChange('valueA')}
        />
      </td>
      <td>
        <input
          type="number"
          className="cell-input cell-number"
          placeholder="0"
          value={row.valueB}
          onChange={handleChange('valueB')}
        />
      </td>
      <td>
        <input
          type="text"
          className="cell-input cell-formula"
          placeholder="e.g. A * B"
          value={row.formula}
          onChange={handleChange('formula')}
        />
      </td>
      <td className="result-td">
        <ResultCell result={row.result} />
      </td>
      <td>
        <button
          className="delete-btn"
          onClick={() => onDelete(row._id)}
          title="Delete row"
          aria-label="Delete row"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}

export default FormulaRow;
