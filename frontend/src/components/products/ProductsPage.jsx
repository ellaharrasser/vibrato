import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getValues } from '../../utils/misc';
import { thunkLoadProducts } from '../../redux/products';
import ProductCard from './ProductCard';


function ProductsPage() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const products = useSelector(state => state.products.products);
    const productsCount = useSelector(state => state.products.productsCount);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        user
            ? dispatch(thunkLoadProducts({ excludeUser: user }))
            : dispatch(thunkLoadProducts());
        setIsLoaded(true);
    }, [user, dispatch]);

    return (
        <main className='container h-max p-4 pb-16 flex flex-col gap-4'>
            {isLoaded ? <>
                <div className='w-full my-4 flex flex-row flex-nowrap items-end gap-2'>
                    <h1 className='text-3xl lg:text-4xl font-bold'>
                        All Products
                    </h1>
                    <p className='text-lg text-stone-800'>
                        {productsCount} results
                    </p>
                </div>
                <ul className='container grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 list-none'>
                    {getValues(products).map(product => (
                        <ProductCard product={product} key={product.id}/>
                    ))}
                </ul>
            </> : <p className='text-base text-stone-800'>Loading...</p>}
        </main>
    );
}

export default ProductsPage;
