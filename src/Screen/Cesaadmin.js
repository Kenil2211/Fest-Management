import axios from 'axios'
import React, { useEffect, useState } from 'react'

import './cesaStyle.css'
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

  const updateHandler = (data) => {

    seteventId(data)
    navigate(`/${data}/update`)
  }

  const addEventHandler =async()=>{
    
    localStorage.setItem('org',"CESA")
    navigate('/addevent') 

  }


  useEffect(() => {

    getEvents()

  }, [flag])


  return (

    <div className="container">
      <h1 className="dashboard-title">CESA DASHBOARD</h1>
      <button className="add-event-button" onClick={()=>{addEventHandler()}}>Add Event</button>

      {Events.length > 0 ? (
        <div className="event-list">
          <h2>EVENT LIST</h2>
        </div>
      ) : (
        <h1>No Events Found</h1>
      )}

      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Participants</th>
            <th>UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {Events?.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.enrolled_students.length}</td>
              <td>
                <button className="update-button" onClick={() => updateHandler(e._id)}>
                  UPDATE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
