import * as types from '../actionTypes';

const initialState = {};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        default: return state;
    }
};

export default authReducer;