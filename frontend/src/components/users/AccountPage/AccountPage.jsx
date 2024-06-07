import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AccountPage.css';
import { thunkLoadUserShops } from '../../../redux/shops';
import { thunkLoadUserProducts } from '../../../redux/products';
import { NavLink, useNavigate } from 'react-router-dom';
import { getKeys, getValues } from '../../../utils/misc';


function AccountPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!user) return navigate('/');
        const fetchUserData = async () => {
            await dispatch(thunkLoadUserShops(user));
            await dispatch(thunkLoadUserProducts(user));
            setDataLoaded(true);
        }
        fetchUserData();
    }, [user, dispatch, navigate]);

    const shops = useSelector(state => state.shops.shops);
    const products = useSelector(state => state.products.products);

    return (
        <main>
            <div id='my-account-container'>
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
            </div>
            <div id='my-shops-container'>
                <h2>My Shops</h2>
                {dataLoaded ? (<>
                    <NavLink to='/shops/new'>Create a Shop</NavLink>
                    {getValues(shops).map(shop => (
                        // <MyShopCard shop={shop} />
                        <ul className='shop-card' key={shop.id}>
                            <li className='name'>{shop.name}</li>
                            <li className='description'>{shop.description}</li>
                            <li>
                                <img
                                    src={shop.image}
                                    alt='Shop Image'
                                    />
                            </li>
                        </ul>
                    ))}
                </>) : <p className='loading'>Loading...</p>}
            </div>
            <div id='my-products-container'>
                <h2>My Products</h2>
                {dataLoaded ? (<>
                    <NavLink to='/products/new'>Create a Product</NavLink>
                    {getValues(products).map(product => (
                        // <MyProductCard product={product} />
                        <ul className='product-card' key={product.id}>
                            <li className='name'>{product.name}</li>
                            <li className='description'>{product.description}</li>
                            <li>
                                <img
                                    src={product.images[0].image}
                                    alt='Product Image'
                                    />
                            </li>
                        </ul>
                    ))}
                </>) : <p className='loading'>Loading...</p>}
            </div>
        </main>
    );
}

export default AccountPage;
