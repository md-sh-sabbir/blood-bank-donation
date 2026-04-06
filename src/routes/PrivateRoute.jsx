import React, { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../providers/AuthContext';
import useRole from '../hooks/useRole';

const PrivateRoute = ({children}) => {
    const {user, loading, userStatus} = use(AuthContext)
    const [role, isRoleLoading] = useRole()

    if(loading || isRoleLoading){
        return <div className='text-center mt-5'><span className="loading loading-spinner loading-xl"></span></div>
    }

    if(!user || userStatus=='blocked'){
        return <Navigate state={location?.pathname} to="/login"></Navigate> 
    }

    return children;
};

export default PrivateRoute