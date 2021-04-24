import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const TheLayout = React.lazy(() => import('../../containers/TheLayout'));

function checkCookie(){
    const role = localStorage.getItem("role");
    console.log(role)
    if(role !== 'admin' || role !== 'user')
        return null;
    else    
        return role;
    
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkCookie() !== null 
        
        ? <TheLayout {...props}/> 
        : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;