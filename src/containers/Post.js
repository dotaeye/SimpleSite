import React, { Component, PropTypes } from 'react'
import { FullScreen } from '../components/UI';
import { TopNav } from '../components/UserControls';
import { connect } from 'react-redux';
import { findBlog } from '../actions/blog';
import { Input } from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';


@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const blogId = state.params.id;
    if (!(state.blog.editBlog)) {
      promises.push(dispatch(findBlog(blogId)));
    }
    return Promise.all(promises);
  }
}])
@connect(state => ({editBlog: state.blog.editBlog}))
export default
class Post extends Component {

    static propTypes = {
        editBlog: PropTypes.object
    };

    render() {
        return (
            <FullScreen className='db'>
                <TopNav/>

                <form>
                    <Input text='text' label='BlogTitle' placeholder="Blog Title"/>
                    <Input type="textarea" label="Blog Content" placeholder="Blog Content"/>
                </form>
            </FullScreen>
        );
    }
}

