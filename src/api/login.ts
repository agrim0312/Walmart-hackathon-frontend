import axios from 'axios';

 export default async function LoginUser ({email, password}:{
  email: string;
  password: string;
 }){
  try {
    const response = await axios.post('http://127.0.0.1:8000/token', new URLSearchParams({
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

    console.log('Token stored successfully:', access_token);
    return response;
  } catch (error:any) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    return error.response;
  }
};

