import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useModal } from '../../context/Modal';
import { thunkDeleteProduct } from '../../redux/products';


function DeleteProductModal({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id));
        // Navigate to homepage if on product details page currently
        if (location.pathname.startsWith('/products/')) {
            navigate('/');
        }
        closeModal();
    };

    return (
        <div className='container p-8 flex flex-col flex-nowrap items-center gap-4 bg-white border border-stone-200 rounded-xl overflow-hidden'>
            <h1 className='text-3xl font-bold'>
                Delete Product
            </h1>
            <p className='text-lg text-center'>
                Are you sure you want to delete this product?
                <br/><span className='font-semibold'>
                    This action cannot be undone.
                </span>
            </p>
            <div className='w-full self-center flex flex-row flex-nowrap justify-center gap-4'>
                <button
                    onClick={handleDelete}
                    className='button-delete'
                >
                    Delete
                </button>
                <button
                    onClick={closeModal}
                    className='button-cancel'
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteProductModal;
