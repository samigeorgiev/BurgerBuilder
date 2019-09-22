import React from 'react';

import styles from './index.module.css';

const button = props => (
    <button
        disabled={props.disabled}
        onClick={props.click}
        className={[styles.Button, styles[props.type]].join(' ')}
    >
        {props.children}
    </button>
);

export default button;