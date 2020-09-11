import * as types from './types';
import {
    validation,
    ALPHABETIC_REG_EXP,
    NUMERIC_REG_EXP,
    EMAIL_REG_EXP
} from '../../../shared/utils/validation';


export const TABS = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP'
};

const INITIAL_FIELDS = {
    firstName: {
        lable: 'First name',
        value: '',
        rules: {
            alphabetic: ALPHABETIC_REG_EXP
        },
        error: null
    },
    lastName: {
        lable: 'Last name',
        value: '',
        rules: {
            alphabetic: ALPHABETIC_REG_EXP
        },
        error: null
    },
    age: {
        type: 'number',
        lable: 'Age',
        value: '',
        rules: {
            numeric: NUMERIC_REG_EXP,
            min: 18,
            max: 100
        },
        error: null
    },
    email: {
        lable: 'E-mail',
        value: '',
        rules: {
            email: EMAIL_REG_EXP
        },
        error: null
    },
    password: {
        type: 'password',
        lable: 'Password',
        value: '',
        rules: {
            minLength: 6
        },
        error: null
    },
    confirmPassword: {
        type: 'password',
        lable: 'Confirm password',
        value: '',
        rules: {
            minLength: 6
        },
        error: null
    }
};

export const initialState = {
    activeTab: TABS.SIGN_IN,
    fields: INITIAL_FIELDS,
    hasError: false
};

const changeActiveTab = (state, payload) => ({
    ...state,
    activeTab: payload.nextActiveTab,
    fields: INITIAL_FIELDS
});

const changeFieldValue = (state, payload) => {
    const field = state.fields[payload.name];

    return {
        ...state,
        fields: {
            ...state.fields,
            [payload.name]: {
                ...field,
                value: payload.value
            }
        }
    };
};

const validateFieldValue = (state, { name, value}) => {
    const field = state.fields[name];

    const {rules} = field;

    let error = null;

    for (const key in rules) {
        const ruleValue = rules[key];
        const validate = validation[key];

        error = validate(ruleValue, value);

        if (error) break;
    }

    return {
        ...state,
        fields: {
            ...state.fields,
            [name]: {
                ...field,
                error
            }
        },
        hasError: !!error
    };
};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CHANGE_ACTIVE_TAB: return changeActiveTab(state, payload);
        case types.CHANGE_FIELD_VALUE: return changeFieldValue(state, payload);
        case types.VALIDATE_FIELD_VALUE: return validateFieldValue(state, payload);

        default: return state;
    }
};
