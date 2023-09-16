import React, { useEffect, useState } from 'react'

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { loginaction } from '../Action/login'
import { loginreducer } from '../Reducers/loginreducer';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginhandler = (data) => {
    console.log(data);
    const user = { email, password };
    if (email === 'sacindus@gmail.com') {
        
      window.location.href = '/sacadmin'; 
      navigate('/sacadmin')

    } else if (email === 'cesaindus@gmail.com') {
      
      window.location.href = '/cesaadmin';
    }

    //dispatch(loginaction(user));
  };

  const userstate = useSelector((state) => state.loginreducer);
  const { currentUser } = userstate;


  const isAdmin = currentUser && currentUser.isAdmin;
  useEffect(() => {
   
    // if (!isAdmin) {
    //   if (email === 'sacindus@gmail.com') {
        
    //     window.location.href = '/sacadmin'; 

    //   } else if (email === 'cesaindus@gmail.com') {
        
    //     window.location.href = '/cesaadmin';
    //   }
    // }
  }, [isAdmin, email]);


  return (
    <div>
      {isAdmin ? (
        
        <>
        <Button>All events </Button>
        <Button>All Organizer</Button>
        <Button>Add Organizer</Button>
        

          <h1>Welcome, Admin!</h1>

        </>
      ) : (
       
        <form style={{width:'50%'}}>
          <MDBInput
            className='mb-4'
            type='email'
            id='form2Example1'
            label='Email address'
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            className='mb-4'
            type='password'
            id='form2Example2'
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <MDBRow className='mb-4'>
            <MDBCol className='d-flex justify-content-center'>
              <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
            </MDBCol>
            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <Button onClick={loginhandler} type='submit'>Login</Button>

          <div className='text-center'>
            <p>
              Not a member? <a href='#!'>Register</a>
            </p>
            <p>or sign up with:</p>

            <MDBBtn floating color='secondary' className='mx-1'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating color='secondary' className='mx-1'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn floating color='secondary' className='mx-1'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating color='secondary' className='mx-1'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </div>
        </form>
      )}
    </div>
  );
}