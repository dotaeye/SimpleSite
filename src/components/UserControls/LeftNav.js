import React from 'react';
import { FullScreen } from '../UI';
import windowListening from '../../mixins/windowListening';

var LeftNav = React.createClass({


    render() {
        return (
            <FullScreen className='left-nav'>
                <div className='logo'></div>
                <h1>Blog Name</h1>
                <p className='desc'>Belief is Important For Everybody</p>
                <hr/>
                <p className='notice'>Belief is Important For Everybody</p>
                <ul className='navigation'>
                    <li>Blog</li>
                    <li>About</li>
                    <li>Subscribe</li>
                </ul>
            </FullScreen>
        );
    }
});

export default LeftNav;

