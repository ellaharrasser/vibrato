import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { thunkLoadNewProducts } from '../../../redux/products';
import ProductCarouselItem from '../ProductCarouselItem/ProductCarouselItem';
import './NewCarousel.css';

function NewCarousel() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const newProducts = useSelector(state => state.products.newProducts);

    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkLoadNewProducts(user));
        setProductsLoaded(true);
    }, [user, dispatch]);

    const [index, setIndex] = useState(0);
    const carouselProducts = useMemo(() => newProducts ? [
        newProducts[index],
        newProducts[(index + newProducts.length + 1) % newProducts.length],
        newProducts[(index + newProducts.length + 2) % newProducts.length],
        newProducts[(index + newProducts.length + 3) % newProducts.length],
        newProducts[(index + newProducts.length + 4) % newProducts.length],
    ] : [], [index, newProducts]);

    const clickPrevious = () => {
        setIndex(index === 0 ? newProducts.length - 1 : index - 1);
    };

    const clickNext = () => {
        setIndex(index === newProducts.length - 1 ? 0 : index + 1);
    };

    return (
        <div id='new-carousel' className='carousel-container'>
            <h2 className='carousel-header'>New Products</h2>
            <ul className='carousel'>
                <button
                    type='button'
                    className='carousel-prev-button'
                    onClick={clickPrevious}
                >
                    <FaAngleLeft style={{
                        width: '20px',
                        height: '20px',
                    }}/>
                </button>
                {productsLoaded && carouselProducts.map(product => (
                    <li className='carousel-item-container' key={product.id}>
                        <ProductCarouselItem
                            product={product}
                        />
                    </li>
                ))}
                <button
                    type='button'
                    className='carousel-next-button'
                    onClick={clickNext}
                >
                    <FaAngleRight style={{
                        width: '20px',
                        height: '20px',
                    }}/>
                </button>
            </ul>
        </div>
    )
}

export default NewCarousel;
