import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export const Sacadmin = () => {

  const [Events, setEvents] = useState([])
  const [flag, setflag] = useState(false)

  const getEvents = async () => {

    axios.get('http://localhost:5000/api/event/events/SAC').then((res)=>{
      console.log("res",res.data.data);
      setEvents(res?.data.data)
    })
    
  }

  const deleteHandler=(data)=>{

    axios.delete(`http://localhost:5000/api/event/${data}`).then((res)=>{
      alert('Event deleted')
      setflag(true)
      console.log("res--",res);
    })
    
  }

  useEffect(() => {

    getEvents()

  }, [flag])


  return (

    <div>
      <h1>SAC DASHBOARD</h1>

      <table border='10'>
        <tr>
          <th>Event Name</th>
          <th style={{paddingLeft:'100px'}}>Description</th>
          <th>Participants</th>
          <th style={{paddingLeft:'20px'}}>UPDATE</th>
        </tr>
        {
          Events?.map((e)=>{
            return(
              <tr>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td style={{paddingLeft:'40px'}}>{e.enrolled_students.length}</td>
                <td>
                  <Button onClick={()=>{deleteHandler(e._id)}}>DELETE</Button>
                </td>
              </tr>
            )
          })
        }
      </table>

    </div>
  )
}
