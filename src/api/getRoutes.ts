import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://walmart-hackathon-backend.onrender.com';

async function getRoutes({data}:any) {
    try {
        // Retrieve the access token from local storage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            throw new Error('No access token found');
        }

        console.log('Token:', token);

        // Send POST request to the backend endpoint
        const response = await axios.post(`${URL}/get_routes`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Handle the response from the backend
        console.log('Routes:', response.data);
        return response;
    } catch (error:any) {
        // Handle any errors that occur during the request
        console.error('Error fetching routes:', error.response ? error.response.data : error.message);
        return error.response ? error.response.data : error.message;
    }
}

export default getRoutes;