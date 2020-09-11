import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import axios from 'axios';

import { useAutoAuthentication } from './useAutoAuthentication';

const { REACT_APP_API_KEY, REACT_APP_MOVIEDB_URL } = process.env;

const authSelector = state => !!state.auth.idToken;

export const useAppState = () => {
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [movies, setMovies] = useState([]);
    
    const isAuthenticated = useSelector(authSelector);

    const history = useHistory();

    useAutoAuthentication();

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = async () => {
        if (!search) return setIsSearching(false);

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

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
          handleSearchSubmit();
        }
    };

    return {
        search,
        isSearching,
        movies,
        isAuthenticated,
        handleSearchChange,
        handleSearchSubmit,
        handleKeyPress
    }
};