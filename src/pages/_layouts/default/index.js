import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

function DefaultLayout({ children }) {
    return <Wrapper>{children}</Wrapper>;
}

export default DefaultLayout;

DefaultLayout.prototype = {
    children: PropTypes.element.isRequired,
};
