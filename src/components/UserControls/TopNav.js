import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import classSet from 'classnames';
import windowListening from '../../mixins/windowListening';


var TopNav = React.createClass({

  mixins: [windowListening],

  propTypes: {
    fixed: PropTypes.bool,
    animateOpacity: PropTypes.bool,
    animateHeight: PropTypes.number
  },

  getDefaultProps(){
    return {
      animateOpacity: false,
      animateHeight: 500
    };
  },

  getInitialState(){
    return {
      scrollScale: 0
    }
  },

  windowListeners: {
    scroll: '_scrollHandle'
  },

  componentDidMount(){
    this._scrollHandle();
  },

  _scrollHandle(){
    const { animateOpacity,animateHeight }=this.props;
    if (animateOpacity) {
      let scrollTop = document.body.scrollTop;
      this.setState({
        scrollScale: scrollTop / animateHeight
      })
    }
  },

  render() {
    const { fixed }=this.props;
    const { scrollScale }=this.state;
    return (
      <div className={classSet({'fixed':fixed}, 'navbar-wrapper')}>
        <div className='navbar-bg' style={{opacity:scrollScale}}>
        </div>
        <Navbar staticTop
                componentClass="header"
                role="banner"
                className='navbar-opacity'
          >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/dashboard">
                <span>Blog-Dashboard</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/home">NavItem 1</NavItem>
              <LinkContainer to='/menu'>
                <NavItem eventKey={2} title="Item">NavItem 2</NavItem>
              </LinkContainer>
              <NavItem eventKey={3} disabled>NavItem 3</NavItem>
              <NavDropdown eventKey={4} title="Dropdown" id="nav-dropdown">
                <MenuItem eventKey="4.1">Action</MenuItem>
                <MenuItem eventKey="4.2">Another</MenuItem>
                <MenuItem eventKey="4.3">Something</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4.4">Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
});

export default TopNav

