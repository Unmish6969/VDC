import React from 'react';
import ResultCell from './ResultCell';

function FormulaRow({ row, onChange, onDelete }) {
  const handleChange = (field) => (e) => {
    const val =
      field === 'valueA' || field === 'valueB'
        ? e.target.value === '' ? '' : parseFloat(e.target.value)
        : e.target.value;
    onChange(row._id, field, val);
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
        <ResultCell localResult={row._localResult} serverResult={row.result} />
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
