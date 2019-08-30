import React from 'react';

import NavigationItems from '../NavigationItems';
import Backdrop from 'components/UI/Backdrop';
import Logo from 'components/Logo';

import styles from './index.module.css';

const sideDrawer = props => {
    const classes = [styles.SideDrawer];
    if (props.show) {
        classes.push(styles.Open);
    } else {
        classes.push(styles.Close);
    }
    return (
        <>
            <Backdrop show={props.show} click={props.close} />
            <div className={classes.join(' ')}>
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