import React from 'react';

import styles from './index.module.css';

import burgerLogo from 'assets/images/burger-logo.png';

const logo = props => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="burgerLogo" />
    </div>
);

export default logo;