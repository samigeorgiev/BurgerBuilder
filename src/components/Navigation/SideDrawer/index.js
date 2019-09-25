import React from 'react';

import Backdrop from 'components/UI/Backdrop';
import Logo from 'components/Logo';
import NavigationItems from '../NavigationItems';

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
            <div className={classes.join(' ')} onClick={props.close}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;