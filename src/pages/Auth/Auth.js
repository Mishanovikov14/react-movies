import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { Button, InputWithLabel } from '../../shared/components';
import { reducer, initialState, TABS} from './store/reducer';
import { changeActiveTab, changeFieldValue, validateFieldValue } from './store/actions';
import { submitAuthenticationData } from '../../store/actions';

import './Auth.scss';

const MODES = {
    [TABS.SIGN_IN]: ['email', 'password'],
    [TABS.SIGN_UP]: ['firstName', 'lastName', 'age', 'email', 'password', 'confirmPassword']
}

const authSelector = state => ({
    isAuthenticated: state.auth.idToken,
    isSubmitting: state.auth.isSubmitting,
    error: state.auth.error
});

const Auth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const { isAuthenticated, isSubmitting, error } = useSelector(authSelector);
    
    const storeDispatch = useDispatch();
    
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) return;
        
        history.push('/popular');
    }, [isAuthenticated, history])

    const handleChangeTab = nextActiveTab => {
        if (state.activeTab === nextActiveTab) return;

        dispatch(changeActiveTab(nextActiveTab));
    };

    const handleChangeFieldValue = e => {
        const { name, value } = e.target;

        dispatch(changeFieldValue(name, value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        const { email, password } = state.fields;

        const isSignIn = state.activeTab === TABS.SIGN_IN;

        const user = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };

        storeDispatch(submitAuthenticationData(isSignIn, user));
    };

    const handleValidateField = e => {
        const { name, value } = e.target;

        dispatch(validateFieldValue(name, value));
    };

    const { activeTab, fields, hasError } = state;

    const formFields = Object
        .entries(fields)
        .filter(([name]) => MODES[activeTab].includes(name));

    return (
        <div className="auth">
            <div className="auth__form-wrapper">
                <div className="auth__tabs">
                    <div
                        className={cn('auth__tab', {
                            'auth__tab--active': activeTab === TABS.SIGN_IN
                        })}
                        role="button"
                        onClick={() => handleChangeTab(TABS.SIGN_IN)}
                    >
                        Sign In
                    </div>

                    <div
                        className={cn('auth__tab', {
                            'auth__tab--active': activeTab === TABS.SIGN_UP
                        })}
                        role="button"
                        onClick={() => handleChangeTab(TABS.SIGN_UP)}
                    >
                        Sign Up
                    </div>
                </div>
    
                <form
                    className="auth__form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <p className="auth__error auth__error--server">{error.message}</p>
                    )}

                    {formFields.map(([name, field]) => (
                        <div key={name} className="auth__field-wrapper">
                            <InputWithLabel
                                type={field.type}
                                label={field.lable}
                                name={name}
                                value={field.value}
                                onBlur={handleValidateField}
                                onChange={handleChangeFieldValue}
                            />

                            {field.error && (
                                <p className="auth__error">{field.error}</p>
                            )}
                        </div>
                    ))}
    
                    <Button
                        type="submit"
                        disabled={hasError || isSubmitting}
                        className="button--primary"
                    >
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Auth;
