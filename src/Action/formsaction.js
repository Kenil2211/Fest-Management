import axios from "axios";
import React from "react";
import swal from 'sweetalert';

export const addnewparticipant = (participants) => async dispatch => {
  dispatch({ type: 'ADD_NEWPARTICIPANT_REQUEST' })

  try {
    const res = await axios.post('http://localhost:5000/api/event/register', participants)
    dispatch({ type: 'ADD_NEWPARTICIPANT_SUCESS', payload: res.data })
    swal('Registered sucessfully')
    
  } catch (error) {
    dispatch({ type: 'ADD_NEWPARTCIPANT_FAILED', payload: error })
    swal('Registeration failed');
  }
}


