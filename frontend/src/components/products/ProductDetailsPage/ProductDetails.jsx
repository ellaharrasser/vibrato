import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkLoadCurrentProduct } from '../../../redux/products';
import './ProductDetails.css';
import { loadCurrentShop, thunkLoadCurrentShop } from '../../../redux/shops';


function ProductDetailsPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const user = useSelector(state => state.session.user);
    const product = useSelector(state => state.products.currentProduct);
    const shop = useSelector(state => state.shops.currentShop);

    useEffect(() => {
        dispatch(thunkLoadCurrentProduct(productId));
    }, [productId, dispatch]);

    useEffect(() => {
        if (!product) return;
        dispatch(loadCurrentShop(product.shop.id));
    }, [product, dispatch])

    return (
        <main>
            {product ? (
                <>
                    <div className='product-images-container'>
                        <img
                            className='product-image'
                            src={product.images[0].image}
                            alt='Product Image'
                        />
                    </div>
                    <div className='product-info'>
                        <h1>{product.brand} {product.name}</h1>
                        <p className='category'>{product.category}</p>
                        <p className='condition'>{product.condition}</p>
                        <p className='price'>{product.productPrice}</p>
                        <p className='shipping-price'>{product.shippingPrice}</p>
                        <p className='description'>{product.description}</p>
                        <div className='product-actions'>
                            {product.shop.owner.id === user.id ? (
                                <>
                                    <NavLink
                                        to={`/products/${product.id}/edit`}
                                    >
                                        Edit Product
                                    </NavLink>
                                </>
                            ) : null /* Add purchase buttons later */ }
                        </div>
                    </div>
                    <div className='shop-info'>
                        <img
                            className='shop-image'
                            src={shop.image}
                            alt='Shop Image'
                        />
                        <h2>{product.shop.name}</h2>
                        <NavLink to={`/shops/${product.shop.id}`}>
                            View Shop
                        </NavLink>
                    </div>
                </>
            ) : (
                <p className='loading'>Loading...</p>
            )}
        </main>
    );
}

export default ProductDetailsPage;
