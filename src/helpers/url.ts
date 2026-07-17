// URL --------------------------------------------------------------------------------------------

// form-urlencode a flat record (for Netlify form posts)
function encode(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}

export { encode };
