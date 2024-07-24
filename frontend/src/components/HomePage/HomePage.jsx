import HomeFooter from './HomeFooter';
import FeaturedPanel from './FeaturedPanel';
import RecentPanel from './RecentPanel';

function HomePage() {
    return (
        <>
            <main className='container h-max p-4 pb-16 flex flex-col gap-8'>
                <FeaturedPanel />
                <RecentPanel />
            </main>
            <HomeFooter />
        </>
    );
}

export default HomePage;
