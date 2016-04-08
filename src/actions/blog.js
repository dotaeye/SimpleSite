import * as blogTypes from '../contants/blog';

export function loadBlogs() {
    return {
        types: [blogTypes.LOAD_BLOG, blogTypes.LOAD_BLOG_SUCCESS, blogTypes.LOAD_BLOG_FAIL],
        promise: (client) => client.get('/blog')
    };
}

export function findBlog(id) {
    return {
        types: [blogTypes.FIND_BLOG_BY_ID, blogTypes.FIND_BLOG_BY_ID_SUCCESS, blogTypes.FIND_BLOG_BY_ID_FAIL],
        promise: (client) => client.get('/blog', {
            query: {
                id: id
            }
        })
    };
}

