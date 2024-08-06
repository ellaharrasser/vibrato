import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunkLogout } from '../../../../../redux/session';
import './ProfileImageButton.css';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [hiddenStyle, setHiddenStyle] = useState('transition-hidden ');
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) {
            setSelectedStyle('border-stone-400 ');
            setHiddenStyle('transition-hidden ');
        } else {
            setSelectedStyle('border-stone-600 ');
            setHiddenStyle('transition-visible ');
        }

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    return (
        <div className='w-[36px] h-full'>
            <img
                className={selectedStyle + 'w-auto h-full rounded-full border-solid border-2 cursor-pointer transition-all hover:border-stone-600'}
                src={user.profileImage}
                alt='Profile Image'
                onClick={toggleMenu}
            />
            <div className='w-0 h-fit flex flex-col flex-nowrap'>
                <ul
                    id='profile-dropdown'
                    className={hiddenStyle + 'transition-all w-max mx-[5px] p-1 relative top-0 right-[60px] list-none border-l-[4px] border-solid border-stone-600 rounded-[2px] bg-white'}
                    ref={ulRef}
                >
                    {user && (
                        <>
                            <li className='mb-1 transition-colors hover:text-teal-500 cursor-pointer'>
                                <NavLink to={`/users/${user.id}`} className=''>
                                    My Account
                                </NavLink>
                            </li>
                            <li onClick={logout} className=' transition-colors hover:text-teal-500 cursor-pointer'>
                                Log Out
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ProfileButton;
