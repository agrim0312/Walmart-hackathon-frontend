import axios from 'axios';

export default async function createUser ({ name, email, password }:{
    name:string;
    email:string;
    password:string;
}){
  try {
    const response = await axios.post('http://127.0.0.1:8000/users',{
      name:name,
      email:email,
      password:password
    },{
      headers: {
        'Content-Type': 'application/json',// Ensure the content type is JSON
      },
    });

    const { access_token } = response.data;

    // Store the token in local storage
    localStorage.setItem('jwtToken', access_token);

    console.log('User created successfully and token stored:', access_token);
    return response;
  } catch (error:any) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    return error.response;
  }
};
