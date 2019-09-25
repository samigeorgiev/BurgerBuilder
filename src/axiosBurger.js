import axios from 'axios';

const inst = axios.create({
    baseURL: process.env.REACT_APP_DATABASE
});

export default inst;