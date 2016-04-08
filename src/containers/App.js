import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Modal} from 'react-bootstrap';
import { errorClear } from '../actions/error';

@connect(state => ({error: state.error.error}),
    {errorClear})
export default
class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired,
        error: PropTypes.object
    };

    onErrorClose() {
        this.props.errorClear();
    }

    render() {
        var showError = this.props.error != null;
        var errorMessage = this.props.error && this.props.error.message;
        return (
            <div id="app">
                {this.props.children}
                <Modal status='error' onHide={this.onErrorClose}
                       show={showError}>
                    <Modal.Header closeButton>
                        <Modal.Title>The Application Get Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Error Message</h4>

                        <div>{errorMessage}</div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
