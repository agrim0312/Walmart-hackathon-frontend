import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://walmart-hackathon-backend.onrender.com';

 export default async function LoginUser ({email, password}:{
  email: string;
  password: string;
 }){
  try {
    const response = await axios.post(`${URL}/token`, new URLSearchParams({
      username: email,
      password: password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;


    // Store the token in local storage
    localStorage.setItem('jwtToken', access_token);

    console.log('Response:', response.status);
    console.log('Token stored successfully:', access_token);
    return response;
  } catch (error:any) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

