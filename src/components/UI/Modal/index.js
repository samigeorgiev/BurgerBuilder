import React, { Component } from 'react';

import Backdrop from '../Backdrop';

import styles from './index.module.css';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} click={this.props.close} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;