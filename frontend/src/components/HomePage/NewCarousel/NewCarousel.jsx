// import { useState, useEffect } from 'react';

import './NewCarousel.css';

function NewCarousel({ products }) {
    // const [carouselIndex, setCarouselIndex] = useState(0);

    return (
        <div id='new-carousel' className='carousel-container'>
            <h2 className='carousel-header'>New Products</h2>
            <ul className='carousel'>
                {products.map(product => (
                    <li className='carousel-item-container' key={product.id}>
                        {/* <ProductCarouselItem
                            product={product}
                        /> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NewCarousel;
