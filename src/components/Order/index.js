import React from 'react';

import styles from './index.module.css';

const order = props => (
    <div className={styles.Order}>
        <p>Ingredients: salad(1)</p>
        <p>Price: <strong>23</strong></p>
    </div>
);

export default order;