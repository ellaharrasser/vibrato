import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';

// import OpenModalMenuItem from '../../OpenModalMenuItem';
// import LoginFormModal from './LoginFormModal';
// import SignupFormModal from './SignupFormModal';
import './ProfileImageButton.css';


function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [imageClass, setImageClass] = useState('profile-image');
  const [infoClass, setInfoClass] = useState('profile-image');
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
              <li>
                <NavLink to={`/`}>My Shops</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </li>
  );
}

export default ProfileButton;
