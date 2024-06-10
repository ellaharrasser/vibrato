import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getValues } from '../../../utils/misc';
import { thunkLoadUserShops } from '../../../redux/shops';
import { loadCurrentProduct, thunkLoadUserProducts } from '../../../redux/products';
import MyShopCard from './MyShopCard';
import MyProductCard from './MyProductCard';
import './AccountPage.css';


function AccountPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkLoadUserShops(user));
        dispatch(thunkLoadUserProducts(user));
        setDataLoaded(true);
    }, [user, dispatch, navigate]);

    const shops = useSelector(state => state.shops.shops);
    const products = useSelector(state => state.products.products);

    // Fixes rerender issue when editing/deleting products/shops
    const productCount = useSelector(state => state.products.count);
    const currentProduct = useSelector(state => state.products.currentProduct);
    useEffect(() => {
        dispatch(thunkLoadUserProducts(user));
    }, [productCount, currentProduct]);

    const shopsCount = useSelector(state => state.shops.count);
    const currentShop = useSelector(state => state.shops.currentShop);
    useEffect(() => {
        dispatch(thunkLoadUserShops(user));
    }, [shopsCount, currentShop]);

    return (
        <main id='account-page'>
            <section id='my-account'>
                <h1>My Account</h1>
                <div id='user-info'>
                    <img
                        className='user-image'
                        src={user.profileImage}
                        alt='User Image'
                    />
                    <div className='user-info-text'>
                        <div className='name-email'>
                            <p className='name'>{user.name}</p>
                            <p className='email'>{user.email}</p>
                        </div>
                        <p className='description'>{user.description}</p>
                    </div>
                </div>
            </section>
            <section id='my-shops'>
                <div id='my-shops-header'>
                    <h2>My Shops</h2>
                    <NavLink to='/shops/new'>Create a Shop</NavLink>
                </div>
                <ul id='my-shops-list'>
                    {dataLoaded ? (<>
                        {getValues(shops).map(shop => (
                            <MyShopCard shop={shop} key={shop.id} />
                        ))}
                    </>) : <p className='loading'>Loading...</p>}
                </ul>
            </section>
            <section id='my-products'>
                <div id='my-products-header'>
                    <h2>My Products</h2>
                    <NavLink to='/products/new'>Create a Product</NavLink>
                </div>
                <ul id='my-products-list'>
                    {dataLoaded ? (<>
                        {getValues(products).map(product => (
                            <MyProductCard product={product} key={product.id} />
                        ))}
                    </>) : <p className='loading'>Loading...</p>}
                </ul>
            </section>
        </main>
    );
}

export default AccountPage;
