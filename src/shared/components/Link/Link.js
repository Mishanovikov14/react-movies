import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import './Link.scss';

const Link = ({
    to,
    as: LinkComponent,
    target,
    exact,
    disabled,
    className,
    activeClassName,
    children
}) => {

    const linkClassName = cn('link', {
        [className]: className
    });

    if (LinkComponent) {
        const props = {
            to,
            exact,
            className: linkClassName,
            disabled
        };

        if (activeClassName) {
            props.activeClassName = activeClassName;
        }

        return (
            <LinkComponent {...props}>
                {children}
            </LinkComponent>
        );
    }

    return (
        <a
            className={linkClassName}
            href={to}
            target={target}
            disabled={disabled}
        >
            {children}
        </a>
    );
};

Link.propTypes = {
    children: PT.node.isRequired,
    className: PT.string,
    target: PT.string,
    exact: PT.bool,
    disabled: PT.bool,
    as: PT.object,
    to: PT.string.isRequired
};

export default Link;
