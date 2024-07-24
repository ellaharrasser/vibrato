function HomeFooter() {
    return (
        <footer className='w-[100%] h-12 fixed bottom-0 flex justify-center gap-8 text-center border-t border-stone-400 bg-[linear-gradient(10deg,_#99f6e4,_#34d399)]'>
            <a href='https://github.com/ethanharrasser' className='my-auto text-lg font-semibold underline decoration-[rgba(0,_0,_0,_0)] decoration-2 underline-offset-2 transition-all hover:decoration-[rgba(0,_0,_0,_1)]'>
                GitHub
            </a>
            <p className='my-auto text-lg font-semibold cursor-not-allowed'>
                LinkedIn
            </p>
        </footer>
    );
}

export default HomeFooter;
