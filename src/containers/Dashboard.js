import React, { Component, PropTypes } from 'react'
import { FullScreen } from '../components/UI';
import { TopNav } from '../components/UserControls';
import { connect } from 'react-redux';
import { loadBlogs, findBlog } from '../actions/blog';
import { LinkContainer } from 'react-router-bootstrap'
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
@connect(state => ({list: state.blog.list, isLoading: state.blog.isLoading}),
    {findBlog})
export default
class Dashboard extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        list: PropTypes.array
    };

    render() {
        return (
            <FullScreen className='db'>
                <TopNav/>

                <div className='db-left'>
                    <div className='db-left-header'>
                        <div className='db-left-title'>All Posts</div>
                        <div className='db-left-add'></div>
                    </div>
                    {this.props.isLoading ? (
                        <div>isLoading</div>
                    ) : (
                        <div className='db-left-list'>
                            {this.props.list.map((blog)=> {
                                let editUrl = `/post/${blog._id}`;
                                return (
                                    <div key={blog._id}>
                                        <LinkContainer to={editUrl}>
                                            <span>{blog.title}</span>
                                        </LinkContainer>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </FullScreen>
        );
    }
}

