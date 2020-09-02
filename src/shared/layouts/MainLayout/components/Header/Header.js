import React from 'react';
import PT from 'prop-types';

import { InputWithLabel, ContentWrapper, NavBar, Button } from '../../../../components'
import './Header.scss';

const ROUTES = [
    {
        url: '/',
        exact: true,
        title: 'Home'
    },
    {
        url: '/favorite',
        title: 'Favorit'
    },
    {
        url: '/logout',
        title: 'Auth'
    }
];

const Header = ({
    search,
    isSearching,
    onSearchChange,
    onSearchSubmit
}) => (
    <header className="header">
        <ContentWrapper className="header__wrapper">

            <div className="header__search-wrapper">
                <InputWithLabel
                    wrapperClass="header__input-wrapper"
                    name="search"
                    label="Search"
                    value={search}
                    onChange={onSearchChange}
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
        </ContentWrapper>
    </header>
);

Header.propTypes = {
    onSearchChange: PT.func.isRequired,
    onSearchSubmit: PT.func.isRequired,
    isSearching: PT.bool.isRequired,
    search: PT.string.isRequired
};

export default Header;
