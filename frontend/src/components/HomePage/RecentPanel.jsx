import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunkLoadNewProducts } from '../../redux/products';
import HomeProductCard from './HomeProductCard';


function RecentPanel() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const newProducts = useSelector(state => state.products.newProducts);

    useEffect(() => {
        dispatch(thunkLoadNewProducts(user));
    }, []);

    return (
        <div className='container flex flex-col flex-nowrap gap-4'>
            <div className='container flex justify-between content-end border-b border-stone-400'>
                <h2 className='text-2xl/6 font-bold align-bottom'>Recent Listings</h2>
                <NavLink to='/products?sort_by=new' className={'text-lg transition-all hover:text-orange-400'}>See More</NavLink>
            </div>
            <ul className='grid grid-cols-2 grid-rows-2 gap-8 list-none sm:flex sm:gap-4'>
                {newProducts?.map(product => (
                    <li className='container h-auto max-sm:[&:nth-child(n+5)]:hidden max-md:last:hidden' key={product.id}>
                        <HomeProductCard product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentPanel;
