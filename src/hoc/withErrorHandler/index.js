import React, { Component } from 'react';

import Modal from 'components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            });
        }
        
        hideErrorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} close={this.hideErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHandler;