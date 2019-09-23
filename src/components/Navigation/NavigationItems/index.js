import React from 'react';

import NavigationItem from './NavigationItem';

import styles from './index.module.css';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>
            BurgerBuilder
        </NavigationItem>
        <NavigationItem link='/orders'>
            Orders
        </NavigationItem>
        <NavigationItem link='/auth'>
            Authenticate
        </NavigationItem>
    </ul>
);

export default navigationItems;