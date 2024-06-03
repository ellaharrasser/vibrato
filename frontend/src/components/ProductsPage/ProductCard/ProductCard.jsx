import './ProductCard.css';


function ProductCard({ product }) {
    return (
        <li className='product-card'>{product.brand} {product.name}</li>
    )
}

export default ProductCard;
