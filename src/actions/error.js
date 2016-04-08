import * as errorTypes from '../contants/error';

export function errorOccurred(error) {
    return {
        type: errorTypes.ERROR_OCCURRED,
        error: error
    };
}

export function errorClear(){
    return {
        type: errorTypes.ERROR_CLEAR
    };
}
