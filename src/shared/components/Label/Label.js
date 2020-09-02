import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import './Label.scss';

const Label = ({ children, htmlFor, className }) => (
    <label 
        htmlFor={htmlFor}
        className={cn('label', {
            [className]: className
        })}>
            {children}
    </label>
);

Label.propTypes = {
    children: PT.node.isRequired,
    className: PT.string,
    htmlFor: PT.string
};

export default Label;
