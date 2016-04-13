import React from 'react';
import classSet from 'classnames';
import TabTemplate from './TabTemplate';


/**
 * Tab list component
 *
 *
 * @example
 * <Tabs
 *     activeOnClick={true}
 *     >
 *     <Tab label={label2}>
 *        {// tab panel}
 *     </Tab>
 *     <Tab label={label2}>
 *        {// tab panel2}
 *     </Tab>
 * </Tabs>
 */
export default React.createClass({
  displayName: 'Tabs',

  propTypes: {
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    initialSelectedIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onHide: React.PropTypes.func,
    activeOnClick: React.PropTypes.bool
  },

  getDefaultProps(){
    return {
      activeOnClick: true,
      initialSelectedIndex: null,
      onChange: ()=> {
      }
    };
  },

  getInitialState(){
    return this.getStateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps){
    this.setState(this.getStateFromProps(nextProps));
  },

  getStateFromProps(props){
    let selectedIndex = null;
    if (props.initialSelectedIndex != null && props.initialSelectedIndex < this.getTabCount()) {
      selectedIndex = props.initialSelectedIndex;
    }
    return {
      selectedIndex: selectedIndex
    };
  },

  getTabCount() {
    return React.Children.count(this.props.children);
  },

  onChangeTab(tabIndex, tab){
    let {selectedIndex} = this.state;
    let nextSelectedIndex = tabIndex;
    if (selectedIndex === nextSelectedIndex) {
      nextSelectedIndex = null;
    }
    this.setState({selectedIndex: nextSelectedIndex}, ()=> {
      //default CB is _onActive. Can be updated in tab.jsx
      if (nextSelectedIndex != null) {
        tab.props.onActive(this, nextSelectedIndex, tab);
      }
    });
  },

  render() {
    const {activeOnClick,initialSelectedIndex,...props} = this.props;
    const {selectedIndex} = this.state;
    let tabContent = [];
    let tabs = React.Children.map(this.props.children, (tab, index) => {
      if (tab.type.displayName === 'Tab') {
        if (tab.props.children) {
          tabContent.push(React.createElement(TabTemplate, {
            key: index,
            tabIndex: index,
            ref: 'tabTemplate_' + index,
            selected: this.state.selectedIndex === index
          }, tab.props.children));
        }
        else {
          tabContent.push(undefined);
        }

        return React.cloneElement(tab, {
          key: index,
          selected: this.state.selectedIndex === index,
          tabIndex: index,
          ref: 'tab_' + index,
          onChangeTab: this.onChangeTab,
          activeOnClick
        });
      }
      else {
        let type = tab.type.displayName || tab.type;
        throw 'Tabs only accepts Tab Components as children. Found ' +
        type + ' as child number ' + (index + 1) + ' of Tabs';
      }
    }, this);

    const containerClass = classSet({
      'tab-container': true,
      'active': selectedIndex !== null
    });

    return (
      <div className={containerClass} {...props}>
        <div className='tab-bar'>
          {tabs}
        </div>
        <div className='tab-content' ref='tabContent'>
          {tabContent}
        </div>
      </div>
    );
  }
});


