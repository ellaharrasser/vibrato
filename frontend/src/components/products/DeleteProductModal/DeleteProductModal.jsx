import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useModal } from '../../../context/Modal';
import { thunkDeleteProduct } from '../../../redux/products';
import './DeleteProductModal.css';


function DeleteProductModal({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id));
        closeModal();
        // Navigate to homepage if on product details page currently
        if (location.pathname.startsWith('/products/')) {
            navigate('/');
        }
    };

    return (
        <div id='delete-product-wrapper'>
            <h1>Delete Product</h1>
            <p>
                Are you sure you want to delete this product?
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
    );
}

export default DeleteProductModal;
