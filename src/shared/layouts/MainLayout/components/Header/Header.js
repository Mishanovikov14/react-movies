import React from 'react';
import PT from 'prop-types';
import { useSelector } from 'react-redux';

import { InputWithLabel, ContentWrapper, NavBar, Button } from '../../../../components'
import './Header.scss';

const ROUTES = [
    {
        url: '/popular',
        title: 'Popular'
    },
    {
        url: '/',
        exact: true,
        title: 'Search'
    },
    {
        url: '/favorite',
        title: 'Favorit'
    },
    {
        title: 'Logout'
    }
];

const authSelector = state => !!state.auth.idToken;

const Header = ({
    search,
    isSearching,
    onSearchChange,
    onSearchSubmit,
    onKeyPress
}) => {
    const isAuthenicated = useSelector(authSelector);

    return (
        <header className="header">
            <ContentWrapper className="header__wrapper">
                {isAuthenicated ? (
                    <>
                        <div className="header__search-wrapper">
                            <InputWithLabel
                                wrapperClass="header__input-wrapper"
                                name="search"
                                label="Search"
                                value={search}
                                onChange={onSearchChange}
                                onKeyPress={onKeyPress}
                            />
            
                            <Button 
                                className="button--primary"
                                disabled={isSearching}
                                onClick={onSearchSubmit}
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </Button>
                        </div>
            
                        <NavBar routes={ROUTES} linkClass="link--primary" />
                    </>
                ) : (
                    <h1 className="header__title">Welcome to our app</h1>
                )}
            </ContentWrapper>
        </header>
    );
}

Header.propTypes = {
    onSearchChange: PT.func.isRequired,
    onSearchSubmit: PT.func.isRequired,
    isSearching: PT.bool.isRequired,
    search: PT.string.isRequired
};

export default Header;
