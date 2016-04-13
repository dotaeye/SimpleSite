import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { FullScreen } from '../components/UI';
import { LeftNav } from '../components/UserControls';

export default
class Menu extends Component {

  static propTypes = {
    menu: PropTypes.array
  };

  render() {
    return (
      <FullScreen className='list'>
        <LeftNav/>
        <ul className='menu-list'>
          {this.props.menu.map((menu, index)=> {
            return (
              <li key={menu._id}>
                <h2 className='post-title'>{menu.title}</h2>

                <p className='post-desc'>{menu.metaDesc}</p>

                <div className='post-metadata'>
                  <time>{menu.updated}</time>
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

