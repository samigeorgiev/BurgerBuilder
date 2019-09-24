import React from 'react';

import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import Logo from 'components/Logo';

import styles from './index.module.css';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle click={props.drawerToggleClick} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;