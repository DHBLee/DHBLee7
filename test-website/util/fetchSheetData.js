export async function fetchSheetData(tabName) {
  const BASE_URL = 'https://api.sheetbest.com/sheets/6b54a76a-271c-4df0-9126-5c7481bcd075/tabs/';

  try {
    const res = await fetch(`${BASE_URL}${tabName}`, {
      next: { revalidate: 600 }, // Revalidate every 10 mins
    });

    const data = await res.json();

    // Filter out rows that have any missing or empty values
    const filteredData = Array.isArray(data)
      ? data.filter(row => {
          return Object.values(row).every(value => value !== null && value !== undefined && String(value).trim() !== '');
        })
      : [];

    return filteredData;
  } catch (error) {
    console.error(`Failed to fetch "${tabName}" tab:`, error);
    return [];
  }
}
