import { NavLink } from 'react-router-dom';

import './FeaturedPanel.css';


function FeaturedPanel() {
    return <section id='featured-panel'>
        <h2>Find new and used music gear easily with vibrato.</h2>
        <NavLink to='/products'>Explore Products</NavLink>
    </section>
}

export default FeaturedPanel;
