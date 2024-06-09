import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AuthRequiredRoute() {
    const user = useSelector(state => state.session.user);

    return user ? (
        <Outlet />
    ) : (
        <Navigate to='/'/>
    )
}

export default AuthRequiredRoute;
