import { useNavigate } from "react-router-dom";

function ProductCarouselItem({ product }) {
    const navigate = useNavigate();

    return (
        <div
            className='product-carousel-item'
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img src={product.image} />
            <p className='product-brand'>{product.brand}</p>
            <p className='product-name'>{product.name}</p>
            <p className='product-price'>{product.price}</p>
        </div>
    );
}

export default ProductCarouselItem;
