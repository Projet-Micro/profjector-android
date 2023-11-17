
import axios from 'axios';
import { tokenParse } from './tokenParse';
// For authenticated users
const api = async () => {
    return axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your API base URL,
        headers: {
            'x-access-token': `${await tokenParse()}`
        }
    });
}
export default api