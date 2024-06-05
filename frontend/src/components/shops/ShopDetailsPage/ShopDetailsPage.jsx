import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkLoadCurrentShop } from '../../../redux/shops';
// import OpenModalButton from '../../common/OpenModalButton';
import './ShopDetailsPage.css';


function ShopDetailsPage() {
    const dispatch = useDispatch();
    const { shopId } = useParams();

    // const user = useSelector(state => state.session.user);
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
                    {/* {shop.owner.id === user.id && (
                        <OpenModalButton
                            modalComponent={<EditShopForm shop={shop}/>}
                            buttonText={'Edit Shop'}
                        />
                    )} */}
                </>
            ) : (
                <p className='loading-message'>Loading...</p>
            )}
        </main>
    );
}

export default ShopDetailsPage;
