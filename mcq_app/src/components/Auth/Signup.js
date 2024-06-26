import React,{useState} from 'react';
import axios from 'axios';

const Signup=()=>{
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:''
    });


const handleChange=e=>{
    setFormData({ ...formData,[e.target.name]:e.target.value});
};

const handleSubmit=async e=>{
    e.preventDefault();
    try{
        const response =await axios.post('/api/users/signup',formData);
        console.log(response.data);
    }
    catch(error)
    {
        console.error(error);
    }
}

}