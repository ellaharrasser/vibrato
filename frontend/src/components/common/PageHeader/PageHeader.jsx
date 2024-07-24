import HeaderSearchBar from './HeaderSearchBar';
import NavBar from './NavBar';
import CategoryNavBar from './CategoryNavBar';
import './PageHeader.css';
import { NavLink } from 'react-router-dom';


function PageHeader() {
    return (
        <>
            <div className='w-full px-4 py-1 flex flex-row flex-nowrap justify-center border-b border-stone-500'>
                <div className='container flex flex-row flex-nowrap justify-between'>
                    <NavLink id='site-name' to='/'>vibrato</NavLink>
                    <HeaderSearchBar />
                    <NavBar />
                </div>
            </div>
            <div className='w-full px-4 py-1 flex flex-row flex-nowrap justify-center border-b border-stone-500'>
                <div id='bottom-header'>
                    <CategoryNavBar />
                </div>
            </div>
        </>
    );
}

export default PageHeader;
