

import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }
    return req;
})

export const createComment=(postId,comment)=>API.post(`/comment/${postId}`,{comment})
export const getComments=(postId)=>API.get(`/comment/${postId}`)

