import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-b9f54-default-rtdb.firebaseio.com/'
})

export default instance;