import React, { Component } from 'react';

import Toolbar from 'components/Navigation/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer';

import styles from './index.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }

    render() {
        return (
            <>
                <Toolbar drawerToggleClick={this.sideDrawerHandler} />
                <SideDrawer
                    close={this.sideDrawerHandler}
                    show={this.state.showSideDrawer}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;