import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { Input, Label } from '../';
import './InputWithLabel.scss';

const InputWithLabel = ({
    label,
    labelClass,
    inputCLass,
    wrapperClass,
    value,
    ...other
}) => (
    <div className={cn('input-with-label', {
        [wrapperClass]: wrapperClass
    })}>
        <Label className={cn('input-with-label__label', {
            'input-with-label__label--top': value,
            [labelClass]: labelClass
        })}>
            {label}
        </Label>
        <Input 
            {...other}
            className={inputCLass}
            value={value}
        />
    </div>
);

InputWithLabel.propTypes = {
    label: PT.node.isRequired,

};

export default InputWithLabel;
