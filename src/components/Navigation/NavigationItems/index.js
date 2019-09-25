import React from 'react';

import NavigationItem from './NavigationItem';

import styles from './index.module.css';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>
            BurgerBuilder
        </NavigationItem>
        {props.isAuth
            ? <NavigationItem link='/orders'>
                Orders
            </NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem link='/logout'>Sign out</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;