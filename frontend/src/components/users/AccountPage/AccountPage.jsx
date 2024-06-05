import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AccountPage.css';
import { thunkLoadUserShops } from '../../../redux/shops';
import { useNavigate } from 'react-router-dom';
import { getKeys, getValues } from '../../../utils/misc';


function AccountPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const shops = useSelector(state => state.shops.shops);

    const [shopsLoaded, setShopsLoaded] = useState(false);

    if (!user) return navigate('/');

    useEffect(() => {
        const fetchUserShops = async () => {
            await dispatch(thunkLoadUserShops(user));
            console.log(shops);
            setShopsLoaded(true);
        }
        fetchUserShops();
    }, [user, dispatch, navigate]);

    return (
        <main>
            <h1>My Account</h1>
            <ul>
                <li className='user-name'>{user.name}</li>
                <li className='user-email'>{user.email}</li>
                <li className='user-description'>{user.description}</li>
                <li>
                    <img
                        className='user-image'
                        src={user.profileImage}
                        alt='User Image'
                    />
                </li>
            </ul>
            {<h2>My Shops</h2>}
            {shopsLoaded ? (
                getKeys(shops).length ? (
                    getValues(shops).map(shop => (
                        // <ShopCard shop={shop} />
                        <ul className='shop-card' key={shop.id}>
                            <li className='shop-name'>{shop.name}</li>
                            <li className='shop-description'>{shop.description}</li>
                            <li>
                                <img
                                    className='shop-image'
                                    src={shop.image}
                                    alt='Shop Image'
                                />
                            </li>
                        </ul>
                    ))
                ) : <p>No shops yet!</p>
            ) : <p className='loading'>Loading...</p>}
        </main>
    );
}

export default AccountPage;
