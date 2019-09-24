import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_STARTED: return authStarted(state, action);
        case actionTypes.AUTH_SUCCEEDED: return authSucceeded(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_SET_REDIRECT_PATH:
            return authSetRedirectPath(state, action);
        default: return state;
    }
};

const authStarted = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSucceeded = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false
    };
};

const authFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    };
};

const authSetRedirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    };
};

export default reducer;