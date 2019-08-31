import axios from 'axios';

const inst = axios.create({
    baseURL: 'https://burgerbuilder-f0b3c.firebaseio.com/'
});

export default inst;