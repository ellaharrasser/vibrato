import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkLogin } from '../../../../redux/session';
import OpenModalMenuItem from '../../OpenModalMenuItem';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';
import ProfileImageButton from './ProfileImageButton';
import './NavBar.css';


function NavBar() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = () => dispatch(thunkLogin({
    email: 'demo@aa.io', password: 'password',
  }));
  // const comingSoonAlert = () => {
  //   window.alert('Account page coming soon!');
  // }

  return (
    <nav id='nav-bar'>
      <ul>
        {user ? (<>
          <li>
            {/* Placeholder for testing */}
            <NavLink to='/products'>Products</NavLink>
          </li>
          <ProfileImageButton user={user} />
        </>) : (<>
          <OpenModalMenuItem
            itemText='Log In'
            modalComponent={<LoginFormModal />}
          />
          <OpenModalMenuItem
            itemText='Sign Up'
            modalComponent={<SignupFormModal />}
          />
          <li onClick={demoLogin}>Demo</li>
        </>)}
      </ul>
    </nav>
  );
}

export default NavBar;
