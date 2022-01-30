import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const GuardedRoute = ({component: Component, redirect = '/', condition = false, path, ...rest}) => {
    return (
        <Route path={path}
               render={(props) => !!condition ? <Component {...props} /> : <Redirect to={redirect} />}
               {...rest}
        />
    );
}

GuardedRoute.propTypes = {
    component: PropTypes.any.isRequired,
    redirect: PropTypes.string,
    condition: PropTypes.any,
    path: PropTypes.string.isRequired
};

export default pure(GuardedRoute);
