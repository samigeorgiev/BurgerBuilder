export const orderForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
        },
        isValid: false,
        isTouched: false
    },
    city: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your City'
        },
        value: '',
        validation: {
            required: true,
        },
        isValid: false,
        isTouched: false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
        },
        value: '',
        validation: {
            required: true,
        },
        isValid: false,
        isTouched: false
    },
    phone: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Phone'
        },
        value: '',
        validation: {
            required: true,
        },
        isValid: false,
        isTouched: false
    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }
            ]
        },
        value: 'fastest',
        validation: {},
        isValid: true
    },
};