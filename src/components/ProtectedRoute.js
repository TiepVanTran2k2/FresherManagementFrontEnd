import React from "react";
import { Redirect, Route } from "react-router-dom";
import { configEnv } from '../configs/config'

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const token = localStorage.getItem(configEnv.TOKEN_KEY);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                token !== null ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    );
}

export default ProtectedRoute;