// Actions

const LOAD_SHOPS = 'shops/loadShops';
const LOAD_CURRENT_SHOP = 'shops/loadCurrentShop';
const DELETE_SHOP = 'shops/deleteShop';

export const loadShops = (shops, count) => {
    return {
        type: LOAD_SHOPS,
        shops,
        count,
    };
};

export const loadCurrentShop = (currentShop) => {
    return {
        type: LOAD_CURRENT_SHOP,
        currentShop,
    };
};

export const deleteShop = (shopId) => {
    return {
        type: DELETE_SHOP,
        shopId,
    };
};

// Thunks

export const thunkLoadUserShops = (user) => async (dispatch) => {
    const url = '/api/shops?owner_id=' + encodeURIComponent(`${user.id}`)
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const shops = {}; // Normalizing data
        data.shops.forEach(shop => shops[shop.id] = shop);
        await dispatch(loadShops(shops, data.count));
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
        return { shop: newShop }; // Return shop for redirecting
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
};

export const thunkEditShop = (formData, shopId) => async (dispatch) => {
    const response = await fetch(`/api/shops/${shopId}`, {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        const editedShop = await response.json();
        await dispatch(loadCurrentShop(editedShop));
        return { shop: editedShop }; // Return shop for redirecting
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
};

export const thunkDeleteShop = (shopId) => async (dispatch) => {
    const response = await fetch(`/api/shops/${shopId}`, {
        method: 'DELETE',
        body: shopId,
    });

    if (response.ok) {
        await dispatch(deleteShop(shopId));
        return { 'shopId': shopId };
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

// Reducer

const initialState = { shops: null, currentShop: null, count: 0 };

const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SHOPS:
            return { ...state, shops: action.shops, count: action.count };
        case LOAD_CURRENT_SHOP:
            return { ...state, currentShop: action.currentShop };
        case DELETE_SHOP: {
            const newState = { ...state };
            if (newState.shops) {
                delete newState.shops[action.shopId];
                newState.count -= 1;
            }
            return newState;
        }
        default:
            return state;
    }
};

export default shopsReducer;
