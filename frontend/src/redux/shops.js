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
    // TODO: Add query params and filters
    const response = await fetch(`/api/user/${user.id}/shops`);
    if (response.ok) {
        const data = await response.json();
        const shops = {}; // Normalizing data
        data.shops.forEach(shop => shops[shop.id] = shop);
        dispatch(loadShops(shops));
    }
};

export const thunkLoadCurrentShop = (shopId) => async (dispatch) => {
    const response = await fetch(`/api/shops/${shopId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCurrentShop(data.shop));
    }
};

// Reducer

const initialState = { shops: null, currentShop: null };

const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SHOPS:
            return { ...state, shops: action.products };
        case LOAD_CURRENT_SHOP:
            return { ...state, currentShop: action.currentShop };
        default:
            return state;
    }
};

export default shopsReducer;
