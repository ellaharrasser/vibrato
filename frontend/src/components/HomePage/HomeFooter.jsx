function HomeFooter() {
    return (
        <footer className='w-[100%] p-4 absolute bottom-0 flex justify-center gap-8 border-t border-stone-600 text-center'>
            <h2 className='my-auto text-lg font-semibold'>My Links</h2>
            <div className='container w-auto my-auto'>
                <p className='text-base text-stone-600'>GitHub</p>
                <a href='https://github.com/ethanharrasser' className='text-base font-semibold transition-all hover:text-teal-500'>ethanharrasser</a>
            </div>
            <div className='container w-auto my-auto'>
                <p className='text-base text-stone-600'>LinkedIn</p>
                <p className='text-base font-semibold cursor-not-allowed'>Coming Soon</p>
            </div>
        </footer>
    );
}

export default HomeFooter;
