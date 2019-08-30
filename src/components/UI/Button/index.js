import React from 'react';

import styles from './index.module.css';

const button = props => (
    <button onClick={props.click} className={[styles.Button, styles[props.type]].join(' ')}>
        {props.children}
    </button>
);

export default button;