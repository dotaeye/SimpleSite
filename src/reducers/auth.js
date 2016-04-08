import * as authTypes from '../contants/auth';

const initialState = {
    loaded: false
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case authTypes.LOAD_SESSION:
            return {
                ...state,
                loading: true
            };
        case authTypes.LOAD_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result
            };
        case authTypes.LOAD_SESSION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case authTypes.LOGIN:
            return {
                ...state,
                loggingIn: true
            };
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: action.result
            };
        case authTypes.LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error
            };
        case authTypes.LOGOUT:
            return {
                ...state,
                loggingOut: true
            };
        case authTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null
            };
        case authTypes.LOGOUT_FAIL:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            };
        default:
            return state;
    }
}

