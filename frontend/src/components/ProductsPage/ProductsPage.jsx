import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { values } from '../../utils/misc';
import { thunkLoadProducts } from '../../redux/products';
import ProductCard from './ProductCard';
import './ProductsPage.css';


function ProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkLoadProducts());
        setIsLoaded(true);
    }, [dispatch])

    return (
        <>
            <h1>All Products</h1>
            <ul id='products-list'>
                {isLoaded && values(products).map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </ul>
        </>
    );
}

export default ProductsPage;
