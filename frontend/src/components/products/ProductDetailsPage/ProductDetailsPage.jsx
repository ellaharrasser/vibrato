import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkLoadCurrentProduct } from '../../../redux/products';
import OpenModalButton from '../../common/OpenModalButton';
import EditProductModal from '../EditProductModal';
import DeleteProductModal from '../DeleteProductModal';
import './ProductDetailsPage.css';


function ProductDetailsPage() {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const user = useSelector(state => state.session.user);
    const product = useSelector(state => state.products.currentProduct);

    useEffect(() => {
        dispatch(thunkLoadCurrentProduct(productId));
    }, [productId, dispatch]);

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
                        {user && product.user.id === user.id && (
                            <div className='owner-actions'>
                                <OpenModalButton
                                    modalComponent={
                                        <EditProductModal product={product}/>
                                    }
                                    buttonText={'Edit'}
                                />
                                <OpenModalButton
                                    modalComponent={
                                        <DeleteProductModal product={product}/>
                                    }
                                    buttonText={'Delete'}
                                />
                            </div>
                        )}
                    </div>
                    <div className='shop-info'>
                        <h2>About the Seller</h2>
                        <img
                            className='shop-image'
                            src={product.shop.image}
                            alt='Shop Image'
                        />
                        <p>{product.shop.name}</p>
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
