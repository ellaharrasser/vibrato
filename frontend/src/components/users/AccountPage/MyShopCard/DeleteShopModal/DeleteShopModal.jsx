import { useDispatch } from 'react-redux';

import { useModal } from '../../../../../context/Modal';
import { thunkDeleteShop } from '../../../../../redux/shops';
import './DeleteShopModal.css';


function DeleteShopModal({ shop }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(thunkDeleteShop(shop.id));
        closeModal();
    };

    return (
        <>
            <h1>Delete Shop</h1>
            <p>
                Are you sure you want to delete this shop?
                This will delete all of its currently listed products.
            </p>
            <p className='shop-name'>{shop.name}</p>
            <div className='buttons-container'>
                <button
                    className='delete-button'
                    type='button'
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className='cancel-button'
                    type='button'
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </>
    );
}

export default DeleteShopModal;
