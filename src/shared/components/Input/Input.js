import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';


import './Input.scss';

const Input = ({
    type = 'text',
    id,
    className = '',
    autoComplete = 'off',
    name,
    placeholder,
    value,
    disabled,
    onChange,
    onBlur,
    onFocus
}) => (
        <input
            tupe={type}
            id={id}
            className={cn('input', {
                [className]: className
            })}
            name={name}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
        />
);

Input.propTypes = {
    type: PT.oneOf(['text', 'password', 'number', 'email']),
    id: PT.string,
    className: PT.string,
    name: PT.string,
    placeholder: PT.string,
    value: PT.string.isRequired,
    autoComplete: PT.oneOf(['on', 'off']),
    disabled: PT.bool,
    onChange: PT.func.isRequired,
    onBlur: PT.func,
    onFocus: PT.func
};

export default Input;
