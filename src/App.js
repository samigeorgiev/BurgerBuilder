import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from 'containers/Layout';
import BurgerBuilder from 'containers/BurgerBuilder';
import Checkout from 'containers/Checkout';
import Orders from 'containers/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;