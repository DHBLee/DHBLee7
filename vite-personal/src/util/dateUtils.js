/**
 * Formats a date string into a more readable format (e.g., "February 10, 2025")
 * @param {string} dateString - The date string to format (e.g., "2025-02-10")
 * @returns {string} Formatted date string (e.g., "February 10, 2025")
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
