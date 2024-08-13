import axios from 'axios';

const createUser = async ({ name, email, password }:{
    name:string,
    email:string,
    password:string
}) => {
  try {
    console.log(name,email,password);
    const response = await axios.post('http://127.0.0.1:8000/users/', {
      name,
      email,
      password,
    });

    const { access_token } = response.data;

    // Store the token in local storage
    localStorage.setItem('jwtToken', access_token);

    console.log('User created successfully and token stored:', access_token);
  } catch (error:any) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
};

export default createUser;