import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ({
    onDelete, 
    yearOfBirth, 
    children
}) => {
    const age = new Date().getFullYear() - yearOfBirth;

    return (
        <div className="card">
            {children}

            <div className="card__info">
                <strong className="card__age">
                   Age: {age}
                </strong>
            </div>

            <button type="button" onClick={onDelete}>
                Delete Card
            </button>
        </div>
    );
};

Card.propTypes = {
    onDelete: PropTypes.func.isRequired,
    yearOfBirth: PropTypes.number.isRequired,
    children: PropTypes.node
};

export default Card;
