import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getValues } from '../../../utils/misc';
import { thunkLoadCurrentShop } from '../../../redux/shops';
import ProductCard from '../../products/ProductCard';
import OpenModalButton from '../../common/OpenModalButton';
import EditShopFormModal from '../EditShopModal';
import DeleteShopModal from '../DeleteShopModal';
import './ShopDetailsPage.css';


function ShopDetailsPage() {
    const dispatch = useDispatch();
    const { shopId } = useParams();

    const user = useSelector(state => state.session.user);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkLoadCurrentShop(shopId));
        setDataLoaded(true);
    }, [dispatch, shopId, user]);

    const shop = useSelector(state => state.shops.currentShop);
    const products = useSelector(state => state.products.products);

    return (
        <main id='shop-details-page'>
            {shop ? <>
                <div id='shop-info'>
                    <img
                        className='shop-image'
                        src={shop.image}
                        alt='Shop Image'
                    />
                    <div className='shop-info-text'>
                        <h1>{shop.name}</h1>
                        <p>{shop.description}</p>
                    </div>
                    {user && shop.owner.id === user.id && (
                        <div className='owner-actions'>
                            <OpenModalButton
                                modalComponent={
                                    <EditShopFormModal shop={shop}/>
                                }
                                buttonText={'Edit'}
                            />
                            <OpenModalButton
                                modalComponent={
                                    <DeleteShopModal shop={shop}/>
                                }
                                buttonText={'Delete'}
                            />
                        </div>
                    )}
                </div>
                <ul className='products-list'>
                    {getValues(products).map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </ul>
            </> : <h1>{dataLoaded ? 'No Shop Found...' : 'Loading...'}</h1>}
        </main>
    );
}

export default ShopDetailsPage;
