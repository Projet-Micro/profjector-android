
import axios from 'axios';
// For authenticated users
const api = async (jwt: string) => {
    return axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your API base URL,
        headers: {
            'x-access-token': `${jwt}`
        }
    });
}
export default api