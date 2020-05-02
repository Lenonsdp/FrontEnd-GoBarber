import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = false;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} component={Component} />;
}

RouteWapper.prototype = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    isPrivate: PropTypes.bool,
};

RouteWapper.defaultProps = {
    isPrivate: false,
};
