import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { evaluateFormula } from '../utils/evaluateFormula';

const API = '/api';
const DEBOUNCE_MS = 300;

export function useRows() {
  const [rows, setRows] = useState([]);
  const debounceTimers = useRef({});

  // Load all rows on mount
  useEffect(() => {
    axios
      .get(`${API}/rows`)
      .then((res) => setRows(res.data))
      .catch((err) => console.error('Failed to load rows:', err));
  }, []);

  // Update a single row field in state and sync to backend (debounced)
  const handleRowChange = useCallback((id, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row._id !== id) return row;
        const updated = { ...row, [field]: value };

        // Evaluate locally for instant feedback
        const evalResult = evaluateFormula(updated.valueA, updated.valueB, updated.formula);
        updated._localResult = evalResult;

        return updated;
      })
    );

    // Debounce the backend sync
    clearTimeout(debounceTimers.current[id]);
    debounceTimers.current[id] = setTimeout(async () => {
      setRows((prev) => {
        const row = prev.find((r) => r._id === id);
        if (!row) return prev;

        axios
          .post(`${API}/evaluate`, {
            id: row._id,
            valueA: row.valueA,
            valueB: row.valueB,
            formula: row.formula,
          })
          .then((res) => {
            setRows((current) =>
              current.map((r) =>
                r._id === id
                  ? { ...r, result: res.data.result ?? res.data.error ?? null }
                  : r
              )
            );
          })
          .catch((err) => console.error('Evaluate error:', err));

        return prev;
      });
    }, DEBOUNCE_MS);
  }, []);

  // Add a new blank row
  const handleAddRow = useCallback(async () => {
    try {
      const res = await axios.post(`${API}/rows`);
      setRows((prev) => [...prev, { ...res.data, _localResult: { error: '' } }]);
    } catch (err) {
      console.error('Failed to add row:', err);
    }
  }, []);

  // Delete a row
  const handleDeleteRow = useCallback(async (id) => {
    try {
      await axios.delete(`${API}/rows/${id}`);
      setRows((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Failed to delete row:', err);
    }
  }, []);

  return { rows, handleAddRow, handleDeleteRow, handleRowChange };
}
