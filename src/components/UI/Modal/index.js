import React from 'react';

import Backdrop from '../Backdrop';

import styles from './index.module.css';

const modal = props => (
    <>
        <Backdrop show={props.show} click={props.close} />
        <div
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </>
);

export default modal;