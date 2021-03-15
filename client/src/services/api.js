import axios from 'axios';

const setToken = token =>{
    if(token)
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     else
      delete axios.defaults.headers.common['Authorization'];
}

const call = async (method, path, data) =>{

 const response = await axios[method](`http://localhost:4000/api/${path}`, data);
 return response.data;
}

export default {call, setToken};