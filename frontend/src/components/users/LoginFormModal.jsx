import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunkLogin } from '../../redux/session';
import { useModal } from '../../context/Modal';


function LoginFormModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(thunkLogin({
            email,
            password,
        }));

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <div className='container p-4 flex flex-col flex-nowrap items-center gap-2 bg-white border border-stone-200 rounded-xl overflow-hidden'>
            <h1 className='my-2 text-3xl font-bold'>
                Log In
            </h1>
            <form onSubmit={handleSubmit} className='container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4'>
                <div className='container'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='email' className='text-lg font-semibold'>
                            Email
                        </label>
                        <span className='font-base text-red-600'>
                            {errors.email && errors.email}
                        </span>
                    </div>
                    <input
                        id='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                        />
                </div>
                <div className='container'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='password' className='text-lg font-semibold'>
                            Password
                        </label>
                        <span className='font-base text-red-600'>
                            {errors.password && errors.password}
                        </span>
                    </div>
                    <input
                        id='password'
                        className='w-full px-1 border border-stone-400 rounded-md'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className='text-base text-red-600'>
                    {errors.server && errors.server}
                </p>
                <div className='w-full self-center flex flex-row flex-nowrap justify-center gap-4'>
                    <button type='submit' className='button-submit'>
                        Log In
                    </button>
                    <button type='button' onClick={closeModal} className='button-cancel'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
