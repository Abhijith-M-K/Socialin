// import axios from "axios";

// const API=axios.create({baseURL:"http://localhost:5000"})

// export const userChats=(id)=>API.get(`/chat/${id}`)




import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });



export const userChats = (id) => API.get(`/chat/${id}`);

