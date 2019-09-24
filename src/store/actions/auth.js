import axios from 'axios';

import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignup) => {
    return  dispatch => {
        dispatch(authStarted());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8QYaFqRFGXaQowXkU4ruETVwbfwEcVdc';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8QYaFqRFGXaQowXkU4ruETVwbfwEcVdc';
        }
        axios.post(url, authData)
            .then(res => {
                const token = res.data.idToken;
                const userId = res.data.localId;
                const expTime = res.data.expiresIn * 1000;
                const expDate = new Date(new Date().getTime() + expTime);
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('expDate', expDate);
                dispatch(authSucceeded(token, userId));
                dispatch(checkAuthTimeout(expTime));
            })
            .catch(err => {
                dispatch(authFailed(err));
            })
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authSetRedirectPath = path => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expDate = new Date(localStorage.getItem('expDate'));
        if (!token || !userId || expDate <= new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSucceeded(token, userId));
            dispatch(
                checkAuthTimeout(expDate.getTime() - new Date().getTime())
            );
        }
    }
}

const authStarted = () => {
    return {
        type: actionTypes.AUTH_STARTED
    };
};

const authSucceeded = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCEEDED,
        token: token,
        userId: userId
    };
};

const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

const checkAuthTimeout = expTime => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        }, expTime);
    };
};