import HomeFooter from './HomeFooter';
import FeaturedPanel from './FeaturedPanel';
// import NewCarousel from './NewCarousel/NewCarousel';
import './HomePage.css';

function HomePage() {
    return (<>
        <main id='home-page' className='container mx-auto pt-4'>
            {/* <h1 className='m-8 text-4xl font-bold'>Welcome!</h1> */}
            <FeaturedPanel />
            {/* <NewCarousel /> */}
        </main>
        <HomeFooter />
    </>);
}

export default HomePage;
