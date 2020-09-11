import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MainLayout } from './shared/layouts';
import { Movies, MovieDetails, Auth, Popular } from './pages';
import { ErrorBoundary } from './shared/components';
import { useAppState } from './shared/hooks';

const Favorite = () => {
return <h1>Favorite</h1>
}

const App = () => {
    const {
        search,
        isSearching,
        movies,
        isAuthenticated,
        handleSearchChange,
        handleSearchSubmit,
        handleKeyPress
    } = useAppState();

    return (
        <ErrorBoundary>
            <MainLayout
                search={search}
                isSearching={isSearching}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onKeyPress={handleKeyPress}
            >
                <Switch>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" exact>
                                <Movies items={movies} />
                            </Route>

                            <Route path="/movie/:id">
                                <MovieDetails movies={movies} />
                            </Route>

                            <Route path="/popular">
                                <Popular />
                            </Route>

                            <Route path="/favorite">
                                <Favorite />
                            </Route>

                            <Redirect to="/popular"/>
                        </>
                    ) : (
                        <>
                            <Route path="/auth">
                                <Auth />
                            </Route>

                            <Redirect to="/auth"/>
                        </>
                    )}
                </Switch>
            </MainLayout>
        </ErrorBoundary>
    );  
};

export default App;
