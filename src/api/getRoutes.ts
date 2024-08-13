import axios from 'axios';

async function getRoutes() {
    try {
        // Retrieve the access token from local storage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            throw new Error('No access token found');
        }

        console.log('Token:', token);

        // Define the request payload
        const data = {
            num_locations: 4, // Example data
            num_vehicles: 3,    // Example data
            locations: [[0, 0], [1, 1], [2, 2], [3, 3]], // Example data
            depot: [0, 0]       // Example data
        };

        // Send POST request to the backend endpoint
        const response = await axios.post('http://localhost:8000/get_routes', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Handle the response from the backend
        console.log('Routes:', response.data);
    } catch (error:any) {
        // Handle any errors that occur during the request
        console.error('Error fetching routes:', error.response ? error.response.data : error.message);
    }
}

export default getRoutes;