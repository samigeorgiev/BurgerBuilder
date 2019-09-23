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
                console.log(res);
                dispatch(authSucceeded(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err));
            })
    };
};

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
        }, expTime * 1000);
    };
};

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};