import React from 'react';

import NavigationItems from '../NavigationItems';
import Backdrop from 'components/UI/Backdrop';
import Logo from 'components/Logo';

import styles from './index.module.css';

const sideDrawer = props => {

    return (
        <>
            <Backdrop show/>
            <div className={styles.SideDrawer}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;