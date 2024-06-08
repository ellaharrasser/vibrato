import { NavLink, useNavigate } from 'react-router-dom';
// import OpenModalButton from '../../../common/OpenModalButton';

function MyProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <li
            className='my-product-card'
        >
            <div
                className='my-product-info'
                onClick={() => navigate(`/products/${product.id}`)}
            >
                <img src={product.images[0].image} alt='Product Image' />
                <p className='name'>{product.name}</p>
                <p className='description'>{product.description}</p>
            </div>
            <div className='my-product-actions'>
                <NavLink to={`/products/${product.id}/edit`}>Edit</NavLink>
                {/* <OpenModalButton
                    modalComponent={<DeleteProductModal product={product}/>}
                    buttonText='Delete'
                /> */}
            </div>
        </li>
    );
}

export default MyProductCard;
