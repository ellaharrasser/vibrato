import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useModal } from '../../../context/Modal';
import { thunkDeleteProduct } from '../../../redux/products';
import './DeleteProductModal.css';


function DeleteProductModal({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id));
        closeModal();
        navigate('/');
    };

    return (
        <div id='delete-product-wrapper'>
            <h1>Delete Product</h1>
            <p>
                Are you sure you want to delete this product?
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
    );
}

export default DeleteProductModal;
