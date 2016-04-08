import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { FullScreen } from '../components/UI';
import { LeftNav } from '../components/UserControls';
import { loadBlogs,findBlog } from '../actions/blog';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!(state.blog && state.blog.list.length > 0)) {
      promises.push(dispatch(loadBlogs()));
    }
    return Promise.all(promises);
  }
}])
@connect(state => ({list: state.blog.list}),
    {findBlog})
export default
class List extends Component {

    static propTypes = {
        list: PropTypes.array
    };

    render() {
        return (
            <FullScreen className='list'>
                <LeftNav/>
                <ul className='post-list'>
                    {this.props.list.map((blog, index)=> {
                        return (
                            <li key={blog._id}>
                                <h2 className='post-title'>{blog.title}</h2>

                                <p className='post-desc'>{blog.metaDesc}</p>

                                <div className='post-metadata'>
                                    <time>{blog.updated}</time>
                                    <a href='#'>х╚нд</a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </FullScreen>
        );
    }
}

