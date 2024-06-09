import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useModal } from '../../../context/Modal';
import { thunkDeleteShop } from '../../../redux/shops';
import './DeleteShopModal.css';


function DeleteShopModal({ shop }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteShop(shop.id));
        closeModal();
        navigate('/');
    };

    return (
        <div id='delete-shop-wrapper'>
            <h1>Delete Shop</h1>
            <p>
                Are you sure you want to delete this shop?
                All of its listed products will be deleted.
                This action cannot be undone.
            </p>
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
    )
}

export default DeleteShopModal;
