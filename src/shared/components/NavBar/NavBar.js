import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { Link } from '../';
import { logoutUser } from '../../../store/actions';
import './NavBar.scss';

const NavBar = ({
    wrapperClass,
    linkClass,
    activeLinkClass = 'navbar__link--active',
    routes
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logoutUser());
        history.push('/auth');
    }

    return (
        <nav className={cn('navbar', {
            [wrapperClass]: wrapperClass
        })}>
            {routes.map(({url, title, ...other}) => {
                if (!url && title === 'Logout') {
                    return (
                        <span
                            key={'logout'}
                            className={cn('navbar__link', {
                                [linkClass]: linkClass
                            })}
                            onClick={handleLogout}
                            {...other}
                        >
                            {title}
                        </span>
                    );
                }
    
                return (
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
                );
            })}
        </nav>
    );
}

NavBar.propTypes = {
    wrapperClass: PT.string,
    linkClass: PT.string,
    activeLinkClass: PT.string,
    routes: PT.arrayOf(PT.shape({
        url: PT.string,
        title: PT.string.isRequired,
        exact: PT.bool,
        target: PT.string
    })).isRequired,
};

export default NavBar;
