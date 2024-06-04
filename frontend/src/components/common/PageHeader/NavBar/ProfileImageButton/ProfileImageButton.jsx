import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';

import { thunkLogout } from '../../../../../redux/session';
import './ProfileImageButton.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [imageClass, setImageClass] = useState('profile-image');
  const [infoClass, setInfoClass] = useState('profile-image hidden');
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) {
      setImageClass('profile-image');
      setInfoClass('profile-info hidden');
    } else {
      setImageClass('profile-image selected');
      setInfoClass('profile-info visible');
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
    <li>
      <img
        className={imageClass}
        src={user.profileImage}
        alt='Profile Image'
        onClick={toggleMenu}
      ></img>
      <div className='invisible-container'>
        <ul className={infoClass} ref={ulRef}>
          {user && (
            <>
              <li>
                <NavLink to={`/users/${user.id}`}>My Profile</NavLink>
              </li>
              <li onClick={logout}>Log Out</li>
            </>
          )}
        </ul>
      </div>
    </li>
  );
}

export default ProfileButton;
