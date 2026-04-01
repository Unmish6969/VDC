import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of `value` that only updates
 * after `delay` ms have elapsed since the last change.
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
