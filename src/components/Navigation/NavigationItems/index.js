import React from 'react';

import NavigationItem from './NavigationItem';

import styles from './index.module.css';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/' active>
            BurgerBuilder
        </NavigationItem>
        <NavigationItem link='/'>
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;