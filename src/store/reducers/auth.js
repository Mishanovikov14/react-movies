import * as types from '../types';

const initialState = {
    idToken: null,
    localId: null,
    isSubmitting: false,
    error: null
};

const authenticateUser = (state, { idToken, localId }) => ({
    ...state,
    idToken,
    localId
});

const startAuthentication = state => ({
    ...state,
    isSubmitting: true,
    error: null
});

const finishAuthentication = (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error: error || null
});

const logoutUser = state => ({
    ...state,
    idToken: null,
    localId: null
});

const authReducer = (state = initialState, action) => {
    const { type, payload = {} } = action;

    switch (type) {
        case types.AUTHENTICATE_USER: return authenticateUser(state, payload);
        case types.AUTHENTICATION_STARTED: return startAuthentication(state);
        case types.AUTHENTICATION_FINISHED: return finishAuthentication(state, payload);
        case types.LOGOUT_USER: return logoutUser(state);
        default: return state;
    }
};

export default authReducer;