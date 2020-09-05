import React, { useState, useEffect } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import PT from 'prop-types';
import axios from 'axios';

import { Button, ContentWrapper, Link } from '../../shared/components';
import './MovieDetails.scss';

const { REACT_APP_STORAGE_URL, REACT_APP_MOVIEDB_URL, REACT_APP_API_KEY } = process.env;


const MovieDetails = ({ movies }) => {
    const { id } =  useParams();

    const [movie, setMovie] = useState(null);

    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchMovieAndSimilarMovies = async () => {
            const movieUrl = `${REACT_APP_MOVIEDB_URL}/movie/${id}?api_key=${REACT_APP_API_KEY}`;
            const similarMoviesUrl = `${REACT_APP_MOVIEDB_URL}/movie/${id}/similar?api_key=${REACT_APP_API_KEY}`;

            const foundMovie = movies.find(movie => movie.id === +id);

            try {
                const response = await Promise.all([
                    foundMovie 
                        ? Promise.resolve({ data: foundMovie })
                        : axios.get(movieUrl),
                    axios.get(similarMoviesUrl)
                ]);

                const [
                    { data: movieData },
                    { data: similarMoviesData }
                ] = response;
               
                setMovie(movieData);
                setSimilarMovies(similarMoviesData.results.slice(0, 5));

                window.scrollTo(0,0);
            } catch (e) {
                console.error(e);
            }
        }

        fetchMovieAndSimilarMovies();
    }, [id]);

    if (!movie) return null;

    const {
        poster_path,
        backdrop_path,
        original_title,
        release_date,
        overview
    } = movie;

    const style = { backgroundImage: `url(${REACT_APP_STORAGE_URL + backdrop_path})` };

    return (
        <div className="movie-details">
            <ContentWrapper
                className="movie-details__wrapper"
                style={style}
            >

                <div className="movie-details__content">
                    <div className="movie-details__image-wrapper">
                        <img
                            src={REACT_APP_STORAGE_URL + poster_path}
                            alt={original_title}
                            className="movie-details__image"
                        />
                    </div>

                    <div className="movie-details__info">
                        <h1 className="movie-details__title">{original_title}</h1>
                        <strong className="movie-details__subtitle">{release_date}</strong>
                        <p className="movie-details__text">{overview}</p>

                        <Button
                            className="button--primary"
                            //TODO: create event
                            onClick={() => {}}
                        >
                            Add to Favorite
                        </Button>
                    </div>
                </div>

                <div className="movie-details__bottom">
                    {similarMovies.map(({ id, poster_path, original_title }) => (
                        <Link 
                            className="movie-details__preview"
                            key={id}
                            as={ReactRouterLink}
                            to={`/movie/${id}`}
                        >
                            <img 
                                src={REACT_APP_STORAGE_URL + poster_path}
                                alt={original_title}
                                className="movie-details__preview-image"
                            />
                        </Link>
                    ))}
                </div>
            </ContentWrapper>
        </div>
    );
}
   
MovieDetails.propTypes = {
    movies: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        original_title: PT.string.isRequired,
        overview: PT.string.isRequired,
        poster_path: PT.string,
        backdrop_path: PT.string,
        release_date: PT.string.isRequired
    })).isRequired
};

export default MovieDetails;
