import React,{PropTypes} from 'react';
import classSet from 'classnames';

var FullScreen = React.createClass({

    displayName: 'FullScreen',

    getDefaultProps: function () {
        return {
            scroll: false
        };
    },

    propType: {
        scroll: PropTypes.bool
    },

    getClassName: function () {
        return classSet({
            'fullscreen': true,
            'fullscreen-scroll': this.props.scroll
        }, this.props.className);
    },

    render: function () {
        var className = this.getClassName();
        return (
            <div
                {...this.props}
                className={className}
                >
                {this.props.children}
            </div>
        );
    }
});

module.exports = FullScreen;
