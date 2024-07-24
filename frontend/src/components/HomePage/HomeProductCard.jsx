import { useNavigate } from 'react-router-dom';

import { centsToUSD } from '../../utils/misc';


function HomeProductCard({ product }) {
    const navigate = useNavigate();

    const productPriceText = centsToUSD(product.productPrice);

    return (
        <div
            className='container h-full flex flex-col cursor-pointer group'
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img src={product.images[0].image} className='w-full h-auto border rounded-xl mb-2 shadow-md'/>
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
            </div>
        </div>
    );
}

export default HomeProductCard;
