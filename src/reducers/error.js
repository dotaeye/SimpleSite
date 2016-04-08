import * as errorTypes from '../contants/error';

const initialState = {
    error: null
};

export default function error(state = initialState, action = {}) {
    switch (action.type) {
        case errorTypes.ERROR_OCCURRED:
            return {
                ...state,
                error: action.error
            };
        case errorTypes.ERROR_CLEAR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

