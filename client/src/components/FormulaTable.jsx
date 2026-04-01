import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRows, addRow, deleteRow } from '../store/rowsSlice';
import FormulaRow from './FormulaRow';

function FormulaTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

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

  // Save all rows to DB on Submit click
  const handleSubmit = async () => {
    if (rows.length === 0) return;
    setSaving(true);
    setSavedMsg('');
    try {
      await Promise.all(
        rows.map((row) =>
          axios.put(`/api/rows/${row._id}`, {
            description: row.description,
            valueA:      row.valueA,
            valueB:      row.valueB,
            formula:     row.formula,
            result:      row.result ?? null,
          })
        )
      );
      setSavedMsg('✓ Saved');
      setTimeout(() => setSavedMsg(''), 2500);
    } catch (err) {
      console.error('Submit failed:', err);
      setSavedMsg('✗ Save failed');
    } finally {
      setSaving(false);
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
      <div className="table-actions">
        <button className="add-btn" onClick={handleAddRow}>
          <span className="add-icon">+</span> Add Row
        </button>
        <div className="submit-area">
          {savedMsg && <span className="saved-msg">{savedMsg}</span>}
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={saving || rows.length === 0}
          >
            {saving ? 'Saving…' : '💾 Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormulaTable;
