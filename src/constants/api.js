import Axios from 'axios';
import { baseUrl } from './baseURL';
const axiosInstance = Axios.create({
  baseURL: baseUrl,
});
export default axiosInstance;
