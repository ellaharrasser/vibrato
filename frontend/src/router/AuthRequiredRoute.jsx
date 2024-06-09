import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AuthRequiredRoute({ children }) {
    const user = useSelector(state => state.session.user);

    return user ? children : <Navigate to='/' replace={true}/>;
}

export default AuthRequiredRoute;
