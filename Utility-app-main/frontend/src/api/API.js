import axios from 'axios'
const origin = "https://utility-backend-app.herokuapp.com"

const setHeader = (token)=>{
    return {
      headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              }
    }
}

const API = {};

/* API.getAll = async (token)=>{
    return await axios.get(`${origin}/find`, setHeader(token));
}

API.getByDate = async (data)=>{
    return await axios.post(`${origin}/find/date`, data, setHeader(token));
}

API.getByTask = async (data)=>{
    return await axios.post(`${origin}/find/todo`, data, setHeader(token));
}

API.addTask = async (data, token)=>{
    return await axios.post(`${origin}/add`, data, setHeader(token));
}

API.deleteTask = async (data, token)=>{
    return await axios.post(`${origin}/delete`, data, setHeader(token));
}

API.updateTask = async (data, token)=>{
    return await axios.post(`${origin}/update`, data, setHeader(token));
} */

API.updateProfile = async (data, token)=>{
    return await axios.post(`${origin}/update/profile`, data, setHeader(token));
}

API.addTip = async (data, token)=>{
    return await axios.post(`${origin}/add/tips`, data, setHeader(token));
}

API.findProfile = async (token)=>{
    return await axios.get(`${origin}/find/profile`, setHeader(token));
}

API.findTip = async (token)=>{
    return await axios.get(`${origin}/find/tips`, setHeader(token));
}

API.signin = async (data) => {
    
    return await axios.post(`${origin}/users/signin`, data, setHeader());
}

API.signup = async (data) => {
    return await axios.post(`${origin}/users/signup`, data, setHeader());
}

API.token = async (token) => {
    return await axios.get(`${origin}/auth`, setHeader(token))
}

API.occupation = async (data, token) => {
    return await axios.post(`${origin}/update/profile/occupation`, data, setHeader(token))
}

API.stripe = async (token) => {
    return await axios.get(`${origin}/stripe`, setHeader(token))
}

API.stripeupdate = async (data, token) => {
    return await axios.post(`${origin}/stripe/update`, data, setHeader(token))
}

API.stripeadd = async (data, token) => {
    return await axios.post(`${origin}/stripe/add`, data, setHeader(token))
}

API.addPost = async (data, token) => {
    return await axios.post(`${origin}/add/post`, data, setHeader(token))
}

API.findPost = async (token) => {
    return await axios.get(`${origin}/find/post`, setHeader(token))
}


export default API;