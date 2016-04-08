import * as blogTypes from '../contants/blog';

const initialState = {
    currentBlog: null,
    list: [],
    isLoading: false,
    isFinding: false
};

export default function blog(state = initialState, action = {}) {
    switch (action.type) {
        case blogTypes.LOAD_BLOG:
            return {
                ...state,
                isLoading: true
            };
        case blogTypes.LOAD_BLOG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.result
            };
        case blogTypes.LOAD_SESSION_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case blogTypes.FIND_BLOG_BY_ID:
            return {
                ...state,
                isFinding: true
            };
        case blogTypes.FIND_BLOG_BY_ID_SUCCESS:
            return {
                ...state,
                isFinding: false,
                currentBlog:action.result
            };
        case blogTypes.FIND_BLOG_BY_ID_FAIL:
            return {
                ...state,
                isFinding: false,
                error: action.error
            };
        default:
            return state;
    }
}

