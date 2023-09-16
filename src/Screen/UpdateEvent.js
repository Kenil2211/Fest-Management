import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export const UpdateEvent = () => {

    const eventId = useParams().id
    const [defaultEvent, setdefaultEvent] = useState({})
    const [date, setdate] = useState(Date.now())
    const [participants, setparticipants] = useState([])

    const { register, handleSubmit, setError } = useForm({
        defaultValues: async () => {

            const res = await axios.get(`http://localhost:5000/api/event/event/${eventId}`)
            console.log(res?.data.data);
            setdefaultEvent(res?.data.data)
            setdate(res?.data?.data?.date_of_event)
            setparticipants(res?.data?.data?.enrolled_students)

            //console.log("date",res?.data?.data?.date_of_event.toString().substring(0,10));
            return ({
                name: res?.data?.data?.name,
                // date_of_event: res?.data?.data?.date_of_event,
                date_of_event:'2023-09-11',
                venue: res?.data?.data?.venue
            })
        }
    })





    const submit = (data) => {
        alert('data')
        console.log(data);
    }

    return (
        <div style={{
            "background-color": "#f4f4f4"
        }}>
            <h1 style={{ textAlign: 'center' }}>
                Update Event
            </h1>
            <div className='container' style={{

                "max-width": "600px",
                "margin": "10px auto",
                "padding": "20px",
                "background-color": " #fff",
                "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)",
                "border-radius": "5px",

            }}>
                <form method='POST' onSubmit={handleSubmit(submit)} style={{
                    "margin-top": "20px"
                }}>
                    <div>
                        <label for='name' style={{ display: 'block' }}>Name</label>
                        <input type='text' {...register('name')} id='name' style={{
                            "width": "100%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='venue' style={{ display: 'block' }}>Venue</label>
                        <input type='text' {...register('venue')} id='venue' style={{
                            "width": "100%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='date' style={{ display: 'block' }}>Event Date</label>
                        <input type='date' {...register('date_of_event')} id='date' style={{
                            "width": "100%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='firstwinner' style={{ display: 'block' }}>First Winner</label>
                        <select style={{
                            "width": "100%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }}>

                            <option value="select">Select</option>

                            
                        </select>
                    </div>


                    <div>
                        <input type='submit' className='btn btn-outline-danger' />
                    </div>
                </form>
            </div>
        </div>
    )
}
