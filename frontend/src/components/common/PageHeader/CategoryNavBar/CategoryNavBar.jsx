import './CategoryNavBar.css';


function CategoryNavBar() {
    const comingSoonAlert = () => {
        window.alert('Category search feature coming soon!');
    }

    return (
        <nav id='category-nav-bar'>
            <ul>
                {/* TODO: Replace with NavLinks (or custom component?) */}
                <li onClick={comingSoonAlert}>
                    Guitars
                </li>
                <li onClick={comingSoonAlert}>
                    Keyboards and Synths
                </li>
                <li onClick={comingSoonAlert}>
                    Effects Pedals
                </li>
                <li onClick={comingSoonAlert}>
                    Drums and Percussion
                </li>
                <li onClick={comingSoonAlert}>
                    Amplifiers
                </li>
            </ul>
        </nav>
    );
}

export default CategoryNavBar;
