import React, { Component } from 'react';

import Toolbar from 'components/Navigation/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer';

import styles from './index.module.css';

class Layout extends Component {

    render() {
        return (
            <>
                <Toolbar />
                <SideDrawer />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;