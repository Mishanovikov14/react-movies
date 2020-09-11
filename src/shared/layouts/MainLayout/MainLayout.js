import React from 'react';
import PT from 'prop-types';


import { Header } from './components';
import './MainLayout.scss';

const MainLayout = ({
    search,
    isSearching,
    onSearchChange,
    onSearchSubmit,
    onKeyPress,
    children
}) => {
    return (
        <div className="main-layout">
            <Header
                search={search}
                isSearching={isSearching}
                onSearchChange={onSearchChange}
                onSearchSubmit={onSearchSubmit}
                onKeyPress={onKeyPress}
            />
            
            <div className="main-layout__body">
                    {children}
            </div>

            <footer className="main-layout__footer">
                <strong className="main-layout__copyright">
                    All Rights Reserved, {new Date().getFullYear()}
                </strong>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {
    search: PT.string.isRequired,
    isSearching: PT.bool.isRequired,
    onSearchChange: PT.func.isRequired,
    onSearchSubmit: PT.func.isRequired,
    children: PT.node.isRequired
};

export default MainLayout;
