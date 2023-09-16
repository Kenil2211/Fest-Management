
import React from 'react'
import axios from 'axios'


export const loginaction = (user) => async dispatch =>{
    dispatch({type :'GET_LOGIN_REQUEST'})
    try{
        const res = await axios.post('http://localhost:5000/api/event/login',user);
    dispatch({type:'GET_LOGIN_SUCESS',payload:res.data})
    localStorage.setItem('currentUser',JSON.stringify(res.data))
    }catch(error){
        dispatch({type:'GET_LOGIN_FAIL',payload:error})
    }

}