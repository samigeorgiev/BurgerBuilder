import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from 'containers/Layout';
import BurgerBuilder from 'containers/BurgerBuilder';
import Checkout from 'containers/Checkout';
import Orders from 'containers/Orders';
import Auth from 'containers/Auth';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/orders" exact component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/auth" exact component={Auth} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;