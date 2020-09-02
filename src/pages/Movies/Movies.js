import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, ContentWrapper } from '../../shared/components';
import './Movies.scss';

const { REACT_APP_STORAGE_URL } = process.env;

const Movies = ({ items }) => {
    const hasMovies = items.length > 0;

    return (
        <div className="movies">
            <ContentWrapper className ={cn('movies__wrapper', {
                'movies__wrapper--unempty': hasMovies
            })}>
                {hasMovies ? items.map( ({id, original_title, poster_path }) => {
                    
                const imageUrl = poster_path ? REACT_APP_STORAGE_URL + poster_path : '#';
    
                    return (
                        <div key={id} className="movies__item">
    
                            <img 
                                className="movies__image"
                                src={imageUrl}
                                alt={original_title}
                            />
    
                            <Link
                                to={`/movie/${id}`}
                                as={ReactRouterLink}
                                className="movies__link"
                            >
                                {original_title}
                            </Link>
                        </div>
                    );
                }) : (
                    <h1>No movies found</h1>
                )}
            </ContentWrapper>
        </div>
    );
}

Movies.propTypes = {
    items: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        original_title: PT.string.isRequired,
        poster_path: PT.string
    })).isRequired
};

export default Movies;
