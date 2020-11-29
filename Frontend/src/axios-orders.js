import axios from 'axios';

const instance = axios.create({
	baseURL: 'dump'
})

export default instance;