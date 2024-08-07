import { useNavigate } from 'react-router-dom';

import { centsToUSD } from '../../utils/misc';


function ProductCard({ product }) {
    const navigate = useNavigate();

    const productPriceText = centsToUSD(product.productPrice);
    const shippingPriceText = (product.shippingPrice > 0)
        ? `${centsToUSD(product.shippingPrice)} Shipping`
        : 'Free Shipping';

    return (
        <li
            onClick={() => navigate(`/products/${product.id}`)}
            className='container w-full h-full flex flex-col cursor-pointer group'
        >
            <img
                src={product.images[0].image}
                alt='Product Image Preview'
                className='w-full h-auto border border-stone-200 rounded-xl mb-2 shadow-md'
            />
            <div className='container flex-1 p-1 rounded-lg bg-transparent transition-all group-hover:bg-orange-200'>
                <p className='text-sm md:text-base lg:text-lg font-semibold overflow-ellipsis line-clamp-2'>
                    {product.brand}
                </p>
                <p className='text-sm/4 md:text-base/5 lg:text-lg/6 overflow-ellipsis line-clamp-2'>
                    {product.name}
                </p>
                <p className='text-base md:text-lg lg:text-xl font-bold overflow-ellipsis'>
                    {productPriceText}
                </p>
                <p className='text-xs md:text-sm lg:text-base font-semibold text-stone-700 overflow-ellipsis'>
                    {shippingPriceText}
                </p>
            </div>
        </li>
    )
}

export default ProductCard;
