import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getValues } from '../../../utils/misc';
import { thunkLoadUserShops } from '../../../redux/shops';
import { thunkLoadUserProducts } from '../../../redux/products';
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

    // Hack to fix rerender issue when deleting products from store
    const productCount = useSelector(state => state.products.count);
    useEffect(() => {}, [productCount]);

    return (
        <main id='account-page'>
            <section id='my-account'>
                <h1>My Account</h1>
                <ul className='user-info'>
                    <li className='name'>{user.name}</li>
                    <li className='email'>{user.email}</li>
                    <li className='description'>{user.description}</li>
                    <li>
                        <img
                            src={user.profileImage}
                            alt='User Image'
                        />
                    </li>
                </ul>
            </section>
            <section id='my-shops'>
                <h2>My Shops</h2>
                <div className='shop-links'>
                    <NavLink to='/shops/new'>Create a Shop</NavLink>
                </div>
                <ul className='my-shops-list'>
                    {dataLoaded ? (<>
                        {getValues(shops).map(shop => (
                            <MyShopCard shop={shop} key={shop.id} />
                        ))}
                    </>) : <p className='loading'>Loading...</p>}
                </ul>
            </section>
            <section id='my-products'>
                <h2>My Products</h2>
                <div className='product-links'>
                    <NavLink to='/products/new'>Create a Product</NavLink>
                </div>
                <ul className='my-products-list'>
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
