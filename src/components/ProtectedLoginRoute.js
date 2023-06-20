import React from "react";
import { Redirect, Route } from "react-router-dom";
import { configEnv } from '../configs/config'

function ProtectedLoginRoute({ component: Component, ...restOfProps }) {
    const token = localStorage.getItem(configEnv.TOKEN_KEY);
    const path = window.location.pathname;

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                token !== null && path === '/login' ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    );
}

export default ProtectedLoginRoute;