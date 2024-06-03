import HeaderSearchBar from './HeaderSearchBar';
import NavBar from './NavBar';
import CategoryNavBar from './CategoryNavBar';
import './PageHeader.css';
import { NavLink } from 'react-router-dom';


function PageHeader() {
    return (
        <>
            <div id='top-header-container'>
                <div id='top-header'>
                    <NavLink id='site-name' to='/'>vibrato</NavLink>
                    <HeaderSearchBar />
                    <NavBar />
                </div>
            </div>
            <div id='bottom-header-container'>
                <div id='bottom-header'>
                    <CategoryNavBar />
                </div>
            </div>
        </>
    );
}

export default PageHeader;
