// Actions

const LOAD_SHOPS = 'shops/loadShops';
const LOAD_CURRENT_SHOP = 'shops/loadCurrentShop';

export const loadShops = (shops) => {
    return {
        type: LOAD_SHOPS,
        shops,
    }
};

export const loadCurrentShop = (currentShop) => {
    return {
        type: LOAD_CURRENT_SHOP,
        currentShop,
    }
};

// Thunks

export const thunkLoadUserShops = (user) => async (dispatch) => {
    const url = '/api/shops?owner_id=' + encodeURIComponent(`${user.id}`)
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const shops = {}; // Normalizing data
        data.shops.forEach(shop => shops[shop.id] = shop);
        await dispatch(loadShops(shops));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

export const thunkLoadCurrentShop = (shopId) => async (dispatch) => {
    const response = await fetch(`/api/shops/${shopId}`);
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadCurrentShop(data.shop));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

export const thunkNewShop = (shop) => async (dispatch) => {
    const response = await fetch('/api/shops/new', {
        method: 'POST',
        body: shop,
    });

    if (response.ok) {
        const newShop = await response.json();
        await dispatch(loadCurrentShop(newShop));
        return { shop: newShop }; // Return shop for redirecting using the id
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
};

// Reducer

const initialState = { shops: null, currentShop: null };

const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SHOPS:
            return { ...state, shops: action.shops };
        case LOAD_CURRENT_SHOP:
            return { ...state, currentShop: action.currentShop };
        default:
            return state;
    }
};

export default shopsReducer;
