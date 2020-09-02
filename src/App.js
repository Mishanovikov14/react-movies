import React, { useState } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


import { MainLayout } from './shared/layouts';
import { Movies, MovieDetails } from './pages';

const { REACT_APP_API_KEY, REACT_APP_MOVIEDB_URL } = process.env;

const Favorite = () => {
return <h1>Favorite</h1>
}
const Auth = () => {
return <h1>Auth</h1>
}

const App = () => {
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [movies, setMovies] = useState([]);
    
    const history = useHistory();

    const handleSearchChange = e => {
        setSearch(e.target.value)
    };

    const handleSearchSubmit = async () => {

        setIsSearching(true);

        const url = `${REACT_APP_MOVIEDB_URL}/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`;

        try {
            const { data } = await axios.get(url);

            setMovies(data.results);
    
            setIsSearching(false);

            setSearch('');
    
            history.push('/');
        } catch (e) {
            console.log(e);
        }

    };



    return (
        <MainLayout
            search={search}
            isSearching={isSearching}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
        >
            <Switch>
                <Route path="/" exact render={() => ( 
                    <Movies items={movies} />
                )}/>

                <Route path="/movie/:id" render={() => (
                    <MovieDetails movies={movies} />
                )}/>

                <Route path="/favorite" component={Favorite} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/"/>
            </Switch>
        </MainLayout>
    );  
};

export default App;
