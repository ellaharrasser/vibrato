export const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const validateUSD = (USD) => /^\d+(?:\.\d{0,2})?$/.test(USD);
