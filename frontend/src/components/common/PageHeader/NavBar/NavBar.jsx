import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { getKeys } from '../../../../utils/misc';
import { thunkLogin } from '../../../../redux/session';
import OpenModalMenuItem from '../../OpenModalMenuItem';
import LoginFormModal from '../../../users/LoginFormModal';
import SignupFormModal from '../../../users/SignupFormModal';
import ProfileImageButton from './ProfileImageButton';
import './NavBar.css';
import { useEffect } from 'react';


function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  useEffect(() => {}, [user?.shops?.length]);

  const demoLogin = () => dispatch(thunkLogin({
    email: 'demo@aa.io', password: 'password',
  }));

  return (
    <nav id='nav-bar'>
      <ul>
        <li>
          {/* Placeholder for testing */}
          <NavLink to='/products'>Products</NavLink>
        </li>
        {user ? (<>
          <li>
            {user.shops.length
              ? <NavLink to='/products/new'>Sell Your Gear</NavLink>
              : <NavLink to='/shops/new'>Create a Shop</NavLink>
            }
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
