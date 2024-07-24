function HomeFooter() {
    return (
        <footer className='w-[100%] p-4 absolute bottom-0 flex justify-center gap-8 text-center border-t border-stone-600 bg-[linear-gradient(10deg,_#99f6e4,_#34d399)]'>
            <h2 className='my-auto text-lg font-semibold'>
                My Links
            </h2>
            <div className='container w-auto my-auto'>
                <p className='text-sm'>
                    GitHub
                </p>
                <a href='https://github.com/ethanharrasser' className='text-lg font-semibold transition-all hover:text-white'>
                    ethanharrasser
                </a>
            </div>
            <div className='container w-auto my-auto'>
                <p className='text-sm'>
                    LinkedIn
                </p>
                <p className='text-lg font-semibold cursor-not-allowed'>
                    Coming Soon
                </p>
            </div>
        </footer>
    );
}

export default HomeFooter;
