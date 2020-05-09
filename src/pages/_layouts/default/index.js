import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../component/header';
import { Wrapper } from './styles';

function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <Header />
            {children}
        </Wrapper>
    );
}

export default DefaultLayout;

DefaultLayout.prototype = {
    children: PropTypes.element.isRequired,
};
