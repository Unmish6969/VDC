import React from 'react';
import FormulaRow from './FormulaRow';
import { useRows } from '../hooks/useRows';

function FormulaTable() {
  const { rows, handleAddRow, handleDeleteRow, handleRowChange } = useRows();

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="formula-table">
          <thead>
            <tr>
              <th>1. Description</th>
              <th>2. Value A <span className="th-sub">(Numeric)</span></th>
              <th>3. Value B <span className="th-sub">(Numeric)</span></th>
              <th>4. Formula <span className="th-sub">(Expression)</span></th>
              <th>5. Result <span className="th-sub">(Auto-calculated)</span></th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">
                  No rows yet — click <strong>+ Add Row</strong> to begin.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <FormulaRow
                key={row._id}
                row={row}
                onChange={handleRowChange}
                onDelete={handleDeleteRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-btn" onClick={handleAddRow}>
        <span className="add-icon">+</span> Add Row
      </button>
    </div>
  );
}

export default FormulaTable;
