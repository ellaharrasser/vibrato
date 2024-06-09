import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkLoadCurrentShop } from '../../../redux/shops';
import OpenModalButton from '../../common/OpenModalButton';
import EditShopFormModal from '../EditShopFormModal';
import './ShopDetailsPage.css';
import DeleteShopModal from '../DeleteShopModal';


function ShopDetailsPage() {
    const dispatch = useDispatch();
    const { shopId } = useParams();

    const user = useSelector(state => state.session.user);
    const shop = useSelector(state => state.shops.currentShop);

    useEffect(() => {
        dispatch(thunkLoadCurrentShop(shopId));
    }, [dispatch, shopId]);

    return (
        <main>
            {shop ? (
                <>
                    <h1>{shop.name}</h1>
                    <p>{shop.description}</p>
                    <img src={shop.image} alt='Shop Image' />
                    {shop.owner.id === user.id && (
                        <div className='owner-actions'>
                            <OpenModalButton
                                modalComponent={<EditShopFormModal shop={shop}/>}
                                buttonText={'Edit'}
                            />
                            <OpenModalButton
                                modalComponent={<DeleteShopModal shop={shop}/>}
                                buttonText={'Delete'}
                            />
                        </div>
                    )}
                </>
            ) : (
                <p className='loading'>Loading...</p>
            )}
        </main>
    );
}

export default ShopDetailsPage;
