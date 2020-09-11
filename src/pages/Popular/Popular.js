import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, ContentWrapper } from '../../shared/components';
import './Popular.scss';

const { REACT_APP_STORAGE_URL, REACT_APP_API_KEY, REACT_APP_MOVIEDB_URL } = process.env;

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const handlePopularMovies = async () => {
            const popularUrl = `${REACT_APP_MOVIEDB_URL}/movie/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`;

            try {
                const { data } = await axios.get(popularUrl);

                setPopularMovies(data.results);
            } catch (e) {
                console.log(e);
            }
        };

        handlePopularMovies();
    }, []);

    return (
        <ContentWrapper className ='popular__wrapper'>
            {popularMovies.map( ({id, original_title, poster_path }) => {
                        
                const imageUrl = poster_path ? REACT_APP_STORAGE_URL + poster_path : '#';

                return (
                    <div key={id} className="popular__item">

                        <img 
                            className="popular__image"
                            src={imageUrl}
                            alt={original_title}
                        />

                        <Link
                            to={`/movie/${id}`}
                            as={ReactRouterLink}
                            className="popular__link"
                        >
                            {original_title}
                        </Link>
                    </div>
                );
            })}
        </ContentWrapper>
    );
}

export default Popular;
