/**
 * @summary Query string generator from request query
 * @param {Object} query
 * @returns {string}
 * */
export const generateQueryString = (query: Record<string, any>) => {
  return Object.keys(query)
    .map((key) => `${key}=${encodeURIComponent(query[key])}`)
    .join('&');
};
