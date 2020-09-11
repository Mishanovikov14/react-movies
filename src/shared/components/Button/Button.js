import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import './Button.scss';

const Button = ({
    type = 'button',
    className,
    disabled,
    children,
    onClick
}) => (
    <button 
        type={type}
        className={cn('button', {
            [className]: className
        })}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    type: PT.oneOf(['button', 'submit', 'reset']),
    className: PT.string,
    disabled: PT.bool,
    children: PT.string.isRequired,
    onClick: PT.func,
    onKeyPress: PT.func
};

export default Button;
