import * as types from './types';


export const changeActiveTab = nextActiveTab => ({
    type: types.CHANGE_ACTIVE_TAB,
    payload: {
        nextActiveTab
    }
});

export const changeFieldValue = (name, value) => ({
    type: types.CHANGE_FIELD_VALUE,
    payload: {
        name,
        value
    }
});

export const validateFieldValue = (name, value) => ({
    type: types.VALIDATE_FIELD_VALUE,
    payload: {
        name,
        value
    }
});