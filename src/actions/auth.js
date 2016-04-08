import * as authTypes from '../contants/auth';

export function load() {
    return {
        types: [authTypes.LOAD_SESSION, authTypes.LOAD_SESSION_SUCCESS, authTypes.LOAD_SESSION_FAIL],
        promise: (client) => client.get('/user')
    };
}

export function login(account) {
    return {
        types: [authTypes.LOGIN, authTypes.LOGIN_SUCCESS, authTypes.LOGIN_FAIL],
        promise: (client) => client.post('/user/login', {
            data: {
                account
            }
        })
    };
}

export function logout() {
    return {
        types: [authTypes.LOGOUT, authTypes.LOGOUT_SUCCESS, authTypes.LOGOUT_FAIL],
        promise: (client) => client.get('/user/logout')
    };
}