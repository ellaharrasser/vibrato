export const getValues = (item) => item ? Object.values(item) : [];
export const getKeys = (item) => item ? Object.keys(item) : [];

const USDFormatter = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
});

export const centsToUSD = (cents) => {
    return USDFormatter.format(cents / 100);
};
