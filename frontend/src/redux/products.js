// Actions

const LOAD_PRODUCTS = 'products/loadProducts';
const LOAD_CURRENT_PRODUCT = 'products/loadCurrentProduct';

export const loadProducts = (products, count) => {
    return {
        type: LOAD_PRODUCTS,
        products,
        count,
    }
};

export const loadCurrentProduct = (currentProduct) => {
    return {
        type: LOAD_CURRENT_PRODUCT,
        currentProduct,
    }
};

// Thunks

export const thunkLoadProducts = () => async (dispatch) => {
    // TODO: Add query params and filters
    const response = await fetch('/api/products');
    if (response.ok) {
        const data = await response.json();
        const products = {}; // Normalizing data
        data.products.forEach(product => products[product.id] = product);
        dispatch(loadProducts(products, data.count));
    }
};

export const thunkLoadUserProducts = (user) => async (dispatch) => {
    const url = '/api/products?owner_id=' + encodeURIComponent(`${user.id}`)
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const products = {}; // Normalizing data
        data.products.forEach(product => products[product.id] = product);
        await dispatch(loadProducts(products, data.count));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

export const thunkLoadCurrentProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCurrentProduct(data.product));
    }
};

// Reducer

const initialState = { products: null, currentProduct: null };

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...state, products: action.products, count: action.count };
        case LOAD_CURRENT_PRODUCT:
            return { ...state, currentProduct: action.currentProduct };
        default:
            return state;
    }
};

export default productsReducer;
