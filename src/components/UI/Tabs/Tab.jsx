import React from 'react';
import classSet from 'classnames';

export default React.createClass({

  displayName: 'Tab',

  propTypes: {
    onChangeTab: React.PropTypes.func,
    selected: React.PropTypes.bool,
    label: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    activeOnClick: React.PropTypes.bool
  },

  getDefaultProps(){
    return {
      activeOnClick: true,
      onActive: ()=> {
      },
      onChangeTab: ()=> {
      }
    };
  },

  onClickTab() {
    let {activeOnClick} = this.props;
    if (activeOnClick) {
      this.props.onChangeTab(this.props.tabIndex, this);
    }
  },

  render() {
    var itemClassName = classSet({
      'tab-item': true,
      'selected': this.props.selected
    });
    return (
      <div className={itemClassName}
           onClick={this.onClickTab}>
        {this.props.label.href ? (
          <a href={this.props.label.href}>{this.props.label.title}</a>
        ) : (
          <span>{this.props.label.title}</span>
        )}
      </div>
    );
  }
});
