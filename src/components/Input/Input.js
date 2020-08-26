import React, { memo } from 'react';
import PT from 'prop-types';

const Input = ({
    type = 'text',
    name,
    placeholder,
    value,
    onChange
}) => {
    console.log('input is rendering...');

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

Input.propTypes = {
    type: PT.oneOf(['text', 'email', 'password', 'number']),
    name: PT.string,
    placeholder: PT.string,
    value: PT.string.isRequired,
    onChange: PT.func.isRequired
};

export default memo(Input);
