import FeaturedPanel from './FeaturedPanel';
import './HomePage.css';

function HomePage() {
    return <main id='home-page'>
        <h1>Welcome to vibrato</h1>
        <FeaturedPanel />
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
                    className='dev-link'
                >
                    Coming Soon
                </p>
            </div>
        </footer>
    </main>
}

export default HomePage;
