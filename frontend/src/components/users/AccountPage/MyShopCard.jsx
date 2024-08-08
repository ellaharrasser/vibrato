import { useNavigate } from 'react-router-dom';

import OpenModalButton from '../../common/OpenModalButton';
import EditShopModal from '../../shops/EditShopModal';
import DeleteShopModal from '../../shops/DeleteShopModal';


function MyShopCard({ shop }) {
    const navigate = useNavigate();

    return (
        <li className='container w-full h-full flex flex-col gap-2'>
            <div
                onClick={() => navigate(`/shops/${shop.id}`)}
                className='container w-full h-full flex flex-col cursor-pointer group'
            >
                <img
                    src={shop.image}
                    alt='Shop Image'
                    className='w-full h-auto border border-stone-200 rounded-xl mb-2 shadow-md'
                />
                <div className='container flex-1 p-1 rounded-lg bg-transparent transition-all group-hover:bg-orange-200'>
                    <p className='text-base md:text-lg lg:text-xl font-semibold overflow-ellipsis line-clamp-1'>
                        {shop.name}
                    </p>
                    <p className='text-sm md:text-base lg:text-lg overflow-ellipsis line-clamp-2'>
                        {shop.description}
                    </p>
                </div>
            </div>
            <div className='w-full flex flex-row flex-nowrap gap-2 md:gap-4 justify-center'>
                <OpenModalButton
                    modalComponent={<EditShopModal shop={shop}/>}
                    buttonText='Edit'
                    className='button-submit-sm'
                />
                <OpenModalButton
                    modalComponent={<DeleteShopModal shop={shop}/>}
                    buttonText='Delete'
                    className='button-delete-sm'
                />
            </div>
        </li>
    );
}

export default MyShopCard;
