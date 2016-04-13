import React from 'react';
import classSet from 'classnames';

export default React.createClass({
    displayName: 'TabTemplate',

    propTypes: {
        children: React.PropTypes.element,
        selected: React.PropTypes.bool,
        tabIndex: React.PropTypes.number
    },

    render() {
        var itemClassName = classSet({
            'tab-content-item': true,
            'selected': this.props.selected
        });
        return (
            <div className={itemClassName} >
                {this.props.children}
            </div>
        );
    }
});
