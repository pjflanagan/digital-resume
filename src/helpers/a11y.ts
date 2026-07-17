// A11Y --------------------------------------------------------------------------------------------

// keydown handler for non-<button> elements with role="button": only activate
// on the keys a real button responds to
function activationKeyHandler(
  handler: () => void
): (e: { key: string; preventDefault: () => void }) => void {
  return (e: { key: string; preventDefault: () => void }): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  };
}

export { activationKeyHandler };
