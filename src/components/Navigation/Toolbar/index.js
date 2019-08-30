import React from 'react';

import NavigationItems from '../NavigationItems';
import Logo from 'components/Logo';

import styles from './index.module.css';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;