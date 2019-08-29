import React from 'react';

import styles from './index.module.css';

const buildControl = props => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less}>
            Less
        </button>
        <button className={styles.More} onClick={props.clickMore}>
            More
        </button>
    </div>
);

export default buildControl;