import axios from 'axios';

import * as types from '../types';

const { REACT_APP_FIREBASE_AUTH_URL, REACT_APP_FIREBASE_API_KEY } = process.env;

const SERVER_ERRORS = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later.'
};

export const submitAuthenticationData = (isSignIn, body) => {
    return async dispatch => {
        try {
            const mode = isSignIn ? 'signInWithPassword' : 'signUp';
    
            const url = `${REACT_APP_FIREBASE_AUTH_URL}${mode}?key=${REACT_APP_FIREBASE_API_KEY}`;

            dispatch(startAuthentication());
    
            const { data : { idToken, localId } } = await axios.post(url, body);

            dispatch(authenticateUser(idToken, localId));
            dispatch(finishAuthentication());

            localStorage.setItem('idToken', idToken);
            localStorage.setItem('localId',localId);
        } catch (e) {
            if (e.isAxiosError) {
                const { message } = e.response.data.error;

                const serverError = new Error(SERVER_ERRORS[message]);
                serverError.name = 'ServerError';

                dispatch(finishAuthentication(serverError));
            }
        }
    };
};

export const authenticateUser = (idToken, localId) => ({
    type: types.AUTHENTICATE_USER,
    payload: {
        idToken,
        localId
    }
});

const startAuthentication = () => ({
    type: types.AUTHENTICATION_STARTED
});

const finishAuthentication = error => ({
    type: types.AUTHENTICATION_FINISHED,
    payload: {
        error
    }
});

export const logoutUser = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');

    return {
        type: types.LOGOUT_USER
    };
};
