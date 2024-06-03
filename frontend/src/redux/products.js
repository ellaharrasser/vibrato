// Actions

const LOAD_PRODUCTS = 'products/loadProducts';

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products,
    }
};

// Thunks

export const thunkLoadProducts = () => async (dispatch) => {
    // TODO: Add query params and filters
    const response = await fetch('/api/products');
    if (response.ok) {
        const productsData = await response.json();
        const products = {}; // Normalizing productsData
        productsData.products.forEach((product) => products[product.id] = product);
        dispatch(loadProducts(products))
    }
};

// Reducer

const initialState = { products: null }

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...state, products: action.products }
        default:
            return state;
    }
};

export default productsReducer;
