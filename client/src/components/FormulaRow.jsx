import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRow } from '../store/rowsSlice';
import ResultCell from './ResultCell';

function FormulaRow({ row, onDelete }) {
  const dispatch = useDispatch();

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    const value =
      field === 'valueA' || field === 'valueB'
        ? raw === '' ? '' : parseFloat(raw)
        : raw;

    // Update Redux immediately → result recomputed in slice, no API call
    dispatch(updateRow({ id: row._id, field, value }));
  };

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
