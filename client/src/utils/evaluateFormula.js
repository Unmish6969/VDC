/**
 * Evaluates a formula string using A and B as variables.
 * Returns { value: number } on success or { error: string } on failure.
 */
export function evaluateFormula(A, B, formula) {
  if (!formula || formula.trim() === '') {
    return { error: '' }; // silent empty state
  }
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function('A', 'B', 'return ' + formula)(
      parseFloat(A) || 0,
      parseFloat(B) || 0
    );
    if (!isFinite(result)) return { error: 'Result is not finite' };
    return { value: result };
  } catch {
    return { error: 'Invalid formula' };
  }
}
