import React from 'react';

function ResultCell({ localResult, serverResult }) {
  // Prefer local (instant) result, fall back to server-persisted result
  let display = '';
  let isError = false;

  if (localResult !== undefined) {
    if (localResult.error === '') {
      // Empty formula — show placeholder
      display = '—';
      isError = false;
    } else if (localResult.error) {
      display = localResult.error;
      isError = true;
    } else if (localResult.value !== undefined) {
      // Format number nicely
      display = Number.isInteger(localResult.value)
        ? localResult.value
        : parseFloat(localResult.value.toFixed(10));
      isError = false;
    }
  } else if (serverResult !== null && serverResult !== undefined) {
    display = serverResult;
    isError = typeof serverResult === 'string';
  } else {
    display = '—';
  }

  return (
    <span className={`result-cell ${isError ? 'result-error' : 'result-ok'}`}>
      {String(display)}
    </span>
  );
}

export default ResultCell;
