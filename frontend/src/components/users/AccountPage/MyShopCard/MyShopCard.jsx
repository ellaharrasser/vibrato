import { NavLink, useNavigate } from 'react-router-dom';
// import OpenModalButton from '../../../common/OpenModalButton';

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
                {/* <NavLink to={`/shops/${shop.id}/edit`}>Edit</NavLink> */}
                {/* <OpenModalButton
                    modalComponent={<DeleteShopModal shop={shop}/>}
                    buttonText='Delete'
                /> */}
            </div>
        </li>
    );
}

export default MyShopCard;
