// URL --------------------------------------------------------------------------------------------

// form-urlencode a flat record (for Netlify form posts)
const encode = (data: Record<string, string>): string => new URLSearchParams(data).toString();

export { encode };
