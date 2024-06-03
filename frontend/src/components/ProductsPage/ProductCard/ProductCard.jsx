import { centsToUSD } from '../../../utils/misc';
import './ProductCard.css';


function ProductCard({ product }) {
    const productPriceText = centsToUSD(product.productPrice);
    const shippingPriceText = (product.shippingPrice > 0)
        ? `${centsToUSD(product.shippingPrice)} Shipping`
        : 'Free Shipping';

    return (
        <li className='product-card'>
            {/* <img src={product.images[0]} /> */}
            <p className='name'>{product.brand} {product.name}</p>
            <p className='condition'>{product.condition}</p>
            <p className='product-price'>{productPriceText}</p>
            <p className='shipping-price'>{shippingPriceText}</p>
        </li>
    )
}

export default ProductCard;
