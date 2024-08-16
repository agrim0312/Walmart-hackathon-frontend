import axios from "axios";


const getDirections = async (coordinates: [number, number][]) => {
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWdyaW0wMzEyIiwiYSI6ImNscW01eDYweDAyNWwya213cGR2Z2JyZmkifQ.VhMNA0js_M-_c9P3bMmqrw'; 
    const start = coordinates[0];
    const end = coordinates[1];

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}`;
    const response = await axios.get(url, {
        params: {
            access_token: MAPBOX_TOKEN,
            geometries: 'geojson',
        },
    });
    return response.data.routes[0].geometry.coordinates;
};

export default getDirections;