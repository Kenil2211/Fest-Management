import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import './style.css'
import { useNavigate } from 'react-router-dom';

export const Cesaadmin = () => {

  const [Events, setEvents] = useState([])
  const [flag, setflag] = useState(false)
  const [eventId, seteventId] = useState('')

  const navigate = useNavigate() 

  const getEvents = async () => {

    axios.get('http://localhost:5000/api/event/events/CESA').then((res) => {
      console.log("res", res.data.data);
      setEvents(res?.data?.data)
      console.log("evnets", Events);
    })
  }

  const deleteHandler = (data) => {

    alert('hi')
    seteventId(data)
    navigate(`/${data}/update`)
  }


  useEffect(() => {

    getEvents()

  }, [flag])


  return (

    <div>
      <h1>CESA DASHBOARD</h1>
      <Button >Add Event</Button>
      {
        Events.length > 0 ?
          <>
            <table border='10'>
              <tr>
                <th>Event Name</th>
                <th style={{ paddingLeft: '100px' }}>Description</th>
                <th>Participants</th>
                <th style={{ paddingLeft: '20px' }}>UPDATE</th>
              </tr>
              {
                Events?.map((e) => {
                  return (
                    <tr>
                      <td>{e.name}</td>
                      <td>{e.description}</td>
                      <td style={{ paddingLeft: '40px' }}>{e.enrolled_students.length}</td>
                      <td>
                        <Button id='showPopupButton' onClick={() => { deleteHandler(e._id) }}>UPDATE</Button>
                      </td>
                    </tr>
                  )
                })
              }
            </table>
          </> : "<h1>No Events Found</h1>"
      }


    </div >
  )
}
