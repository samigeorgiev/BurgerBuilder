import React from 'react';

import NavigationItems from '../NavigationItems';
import Logo from 'components/Logo';

import styles from './index.module.css';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;