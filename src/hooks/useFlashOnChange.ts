import { useEffect, useRef, useState } from 'react';

// briefly flips a boolean to true whenever a dependency changes, skipping the
// initial mount so the effect only plays on subsequent changes
function useFlashOnChange(deps: unknown[], durationMs = 400): boolean {
  const hasMounted = useRef(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setIsFlashing(true);
    const timeout = setTimeout(() => setIsFlashing(false), durationMs);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isFlashing;
}

export { useFlashOnChange };
