// Actions

const LOAD_PRODUCTS = 'products/loadProducts';
const LOAD_CURRENT_PRODUCT = 'products/loadCurrentProduct';

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products,
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
        dispatch(loadProducts(products));
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
            return { ...state, products: action.products };
        case LOAD_CURRENT_PRODUCT:
            return { ...state, currentProduct: action.currentProduct };
        default:
            return state;
    }
};

export default productsReducer;
