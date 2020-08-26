import React from 'react';
import PT from 'prop-types';

const View = ({ data, onClick }) => (
    <div className="view">
        <strong>{data}</strong>

        <button type="button" onClick={() => onClick('Hello world')}>
            Set data
        </button>
    </div>
);

View.propTypes = {
    data: PT.string,
    onClick: PT.func.isRequired
};

export default View;
