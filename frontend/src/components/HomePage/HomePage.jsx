import FeaturedPanel from './FeaturedPanel';
import NewCarousel from './NewCarousel/NewCarousel';
import './HomePage.css';

function HomePage() {
    return <main id='home-page'>
        <h1>Welcome!</h1>
        <FeaturedPanel />
        <NewCarousel />
        <footer>
            <h2>My Links</h2>
            <div className='link-container'>
                <p className='link-label'>GitHub:</p>
                <a
                    className='dev-link'
                    href='https://github.com/ethanharrasser'
                >
                        ethanharrasser
                </a>
            </div>
            <div className='link-container'>
                <p className='link-label'>LinkedIn:</p>
                <p
                    className='disabled-dev-link'
                >
                    Coming Soon
                </p>
            </div>
        </footer>
    </main>
}

export default HomePage;
