import React from 'react'
import axios from "axios";


export const getallevents = ()=> async dispatch =>{
    dispatch({type:'GET_EVENT_REQUEST'})
    try{
         const res =  await axios.get(`http://localhost:5000/api/event/getallevent`)
         
         dispatch({type:'GET_EVENT_SUCESS', payload:res.data})
         
    }catch(error){
        dispatch({type:'GET_EVENT__FAIL',payload:error});
    }
}


