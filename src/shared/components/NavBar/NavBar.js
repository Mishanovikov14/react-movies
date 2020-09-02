import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Link } from '../';

import './NavBar.scss';

const NavBar = ({
    wrapperClass,
    linkClass,
    activeLinkClass = 'navbar__link--active',
    routes
}) => (
    <nav className={cn('navbar', {
        [wrapperClass]: wrapperClass
    })}>
        {routes.map(({url, title, ...other}) => (
            <Link
                key={url}
                to={url}
                as={NavLink}
                activeClassName={activeLinkClass}
                className={cn('navbar__link', {
                    [linkClass]: linkClass
                })}
                {...other}
            >
                {title}
            </Link>
        ))}
    </nav>
);

NavBar.propTypes = {
    wrapperClass: PT.string,
    linkClass: PT.string,
    activeLinkClass: PT.string,
    routes: PT.arrayOf(PT.shape({
        url: PT.string,
        title: PT.string,
        exact: PT.bool,
        target: PT.string
    })).isRequired,
};

export default NavBar;
