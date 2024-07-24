import HomeFooter from './HomeFooter';
import FeaturedPanel from './FeaturedPanel';
// import NewCarousel from './NewCarousel/NewCarousel';

function HomePage() {
    return (
        <>
            <main className='container p-4 flex flex-col gap-4'>
                <FeaturedPanel />
                {/* <NewCarousel /> */}
            </main>
            <HomeFooter />
        </>
    );
}

export default HomePage;
