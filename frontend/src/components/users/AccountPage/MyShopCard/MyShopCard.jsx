import { useNavigate } from 'react-router-dom';

import OpenModalButton from '../../../common/OpenModalButton';
import EditShopModal from '../../../shops/EditShopModal';
import DeleteShopModal from '../../../shops/DeleteShopModal';
import './MyShopCard.css';

function MyShopCard({ shop }) {
    const navigate = useNavigate();

    return (
        <li
            className='my-shop-card'
        >
            <div
                className='my-shop-info'
                onClick={() => navigate(`/shops/${shop.id}`)}
            >
                <img src={shop.image} alt='Shop Image' />
                <p className='name'>{shop.name}</p>
                <p className='description'>{shop.description}</p>
            </div>
            <div className='my-shop-actions'>
                <OpenModalButton
                    modalComponent={<EditShopModal shop={shop}/>}
                    buttonText='Edit'
                />
                <OpenModalButton
                    modalComponent={<DeleteShopModal shop={shop}/>}
                    buttonText='Delete'
                />
            </div>
        </li>
    );
}

export default MyShopCard;
