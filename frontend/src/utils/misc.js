// Utility functions to call on redux store data
// If data is unloaded (falsy) return empty array instead of throwing an error
export const getValues = (item) => (item ? Object.values(item) : []);
export const getKeys = (item) => (item ? Object.keys(item) : []);

// Utility function to check if an index is within bounds of an array,
// returning the element if so, otherwise returning null
export const getFromIndex = (array, index) => {
  return array.length >= index - 1 ? array[index] : null;
};

const USDFormatter = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

// Utility function to format cents values to a displayable USD string
export const centsToUSD = (cents) => {
  return USDFormatter.format(cents / 100);
};

// Utility array / function for validating image file uploads
export const endsWithOne = (string, suffixArray) => {
  for (const suffix of suffixArray) {
    if (string.endsWith(suffix)) return true;
  }
  return false;
};

export const imageSuffixes = [".pdf", ".png", ".jpg", ".jpeg", ".gif"];
