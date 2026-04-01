import React from 'react';

/**
 * Read-only result display.
 * result: number → green pill
 * result: string → red pill (error message)
 * result: null/undefined → em dash
 */
function ResultCell({ result }) {
  // Empty string = empty formula (silent state), treat same as null
  if (result === null || result === undefined || result === '') {
    return <span className="result-cell">—</span>;
  }

  const isError = typeof result === 'string';
  const display = isError
    ? result
    : typeof result === 'number'
      ? (Number.isInteger(result) ? result : parseFloat(result.toFixed(10)))
      : result;

  return (
    <span className={`result-cell ${isError ? 'result-error' : 'result-ok'}`}>
      {String(display)}
    </span>
  );
}

export default ResultCell;
