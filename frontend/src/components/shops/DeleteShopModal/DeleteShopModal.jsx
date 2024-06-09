import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useModal } from '../../../context/Modal';
import { thunkDeleteShop } from '../../../redux/shops';
import './DeleteShopModal.css';


function DeleteShopModal({ shop }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteShop(shop.id));
        closeModal();
        // Navigate to homepage if on shop details page currently
        if (location.pathname.startsWith('/shops/')) {
            navigate('/');
        }
    };

    return (
        <div id='delete-shop-wrapper'>
            <h1>Delete Shop</h1>
            <p>
                Are you sure you want to delete this shop?
                <br />All of its listed products will be deleted.
                <br /><br />This action cannot be undone.
            </p>
            <div className='buttons-container'>
                <button
                    className='delete-button'
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className='cancel-button'
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteShopModal;
