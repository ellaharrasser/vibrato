import { useNavigate } from 'react-router-dom';

import { centsToUSD } from '../../../../utils/misc';
import OpenModalButton from '../../../common/OpenModalButton';
import EditProductModal from '../../../products/EditProductModal';
import DeleteProductModal from '../../../products/DeleteProductModal';
import './MyProductCard.css';


function MyProductCard({ product }) {
    const navigate = useNavigate();

    const productPriceText = centsToUSD(product.productPrice);
    const shippingPriceText = (product.shippingPrice > 0)
        ? `${centsToUSD(product.shippingPrice)} Shipping`
        : 'Free Shipping';

    return (
        <li className='my-product-card'>
            <div
                className='my-product-info'
                onClick={() => navigate(`/products/${product.id}`)}
            >
                <img src={product.images[0].image} alt='Product Image' />
                <p className='name'>{product.name}</p>
                <p className='condition'>{product.condition}</p>
                <p className='description'>{product.description}</p>
                <p className='product-price'>{productPriceText}</p>
                <p className='shipping-price'>{shippingPriceText}</p>
            </div>
            <div className='my-product-actions'>
                <OpenModalButton
                    modalComponent={<EditProductModal product={product}/>}
                    buttonText='Edit'
                />
                <OpenModalButton
                    modalComponent={<DeleteProductModal product={product}/>}
                    buttonText='Delete'
                />
            </div>
        </li>
    );
}

export default MyProductCard;
