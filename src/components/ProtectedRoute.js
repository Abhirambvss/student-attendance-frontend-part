import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const login = localStorage.getItem('login')

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                login ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;