import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosBurger';

import styles from './index.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Samuil Georgiev',
                city: 'Sofia',
                phone: '0877777777'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Your email" />
                    <input type="text" name="street" placeholder="Your street" />
                    <input type="text" name="postalCode" placeholder="Your postal code" />
                    <Button type="Success" click={this.orderHandler}>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);