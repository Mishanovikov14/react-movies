import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import './ContentWrapper.scss';

const ContentWrapper = ({ className, children, ...other }) => (
    <div
        {...other} 
        className={cn('content-wrapper', {
            [className]: className
        })}
    >
        {children}
    </div>
);

ContentWrapper.propTypes = {
    children: PT.node.isRequired,
    className: PT.string
};

export default ContentWrapper;

