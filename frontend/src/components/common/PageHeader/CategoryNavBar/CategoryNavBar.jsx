import { NavLink } from 'react-router-dom';

// import './CategoryNavBar.css';


function CategoryNavBar() {
    const comingSoonAlert = () => {
        window.alert('Category search feature coming soon!');
    }

    return (
        <nav className='container'>
            <ul className='container flex flex-row flex-nowrap justify-center gap-4'>
                <li
                    onClick={comingSoonAlert}
                >
                    <NavLink to='/products?category=guitars'>Guitars</NavLink>
                </li>
                <li
                    onClick={comingSoonAlert}
                >
                    <NavLink to='/products?category=keyboards_synths'>Keyboards and Synths</NavLink>
                </li>
                <li
                    onClick={comingSoonAlert}
                >
                    <NavLink to='/products?category=effects_pedals'>Effects Pedals</NavLink>
                </li>
                <li
                    onClick={comingSoonAlert}
                >
                    <NavLink to='/products?category=drums_percussion'>Drums and Percussion</NavLink>
                </li>
                <li
                    onClick={comingSoonAlert}
                >
                    <NavLink to='/products?category=amplifiers'>Amplifiers</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default CategoryNavBar;
