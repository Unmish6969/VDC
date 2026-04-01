import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRows, addRow, deleteRow } from '../store/rowsSlice';
import FormulaRow from './FormulaRow';

function FormulaTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);

  // Fetch all rows ONCE on mount
  useEffect(() => {
    axios
      .get('/api/rows')
      .then((res) => dispatch(setRows(res.data)))
      .catch((err) => console.error('Failed to load rows:', err));
  }, [dispatch]);

  const handleAddRow = async () => {
    try {
      const res = await axios.post('/api/rows');
      dispatch(addRow(res.data));
    } catch (err) {
      console.error('Failed to add row:', err);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`/api/rows/${id}`);
      dispatch(deleteRow(id));
    } catch (err) {
      console.error('Failed to delete row:', err);
    }
  };

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
