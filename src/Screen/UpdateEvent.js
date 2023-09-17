import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './updatestyle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateEvent = () => {

    const eventId = useParams().id
    const [defaultEvent, setdefaultEvent] = useState({})
    const [date, setdate] = useState(Date.now())
    const [participants, setparticipants] = useState([])
    const [first_winner, setfirst_winner] = useState()
    const [second_winner, setsecond_winner] = useState()
    const [third_winner, setthird_winner] = useState()
    const navigate = useNavigate()

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
                date_of_event: res?.data?.data?.date_of_event,
                // date_of_event:'2023-09-11',
                venue: res?.data?.data?.venue,

            })
        }
    })

    const firstoptionHandler = (first_winner) => {
        setfirst_winner(first_winner)
    }

    const secondoptionHandler = (second_winner) => {
        setsecond_winner(second_winner)
    }
    const thirdoptionHandler = (third_winner) => {  
        setthird_winner(third_winner)
    }


    const submit = (data) => {
        if (data.first_winner === 'Select') {
            data.first_winner = null
            data.second_winner = null
            data.third_winner = null
        }
        if (data.second_winner === 'Select') {
            data.second_winner = null
            data.third_winner = null
        }
        if (data.third_winner === 'Select') {
            data.third_winner = null
        }

        axios.put(`http://localhost:5000/api/event/update/${eventId}`, data).then((res) => {

            if (res.data) {
                toast('Event Updated ✅', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                setTimeout(() => {
                    navigate('/cesaadmin')
                }, 2000);
            } else {
                throw new Error('Something went Wrong')
            }

        }).catch((err) => {
            toast.error('Something Went Wrong ❌', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        })

        console.log("data", data);
    }

    return (
        <div style={{
            "background-color": "#f4f4f4"
        }}>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
                            "width": "50%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='venue' style={{ display: 'block' }}>Venue</label>
                        <input type='text' {...register('venue')} id='venue' style={{
                            "width": "50%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='date' style={{ display: 'block' }}>Event Date</label>
                        <input type='date' {...register('date_of_event')} id='date' style={{
                            "width": "50%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }} />
                    </div>

                    <div>
                        <label for='firstwinner' style={{ display: 'block' }}>First Winner</label>
                        <select {...register('first_winner')} onChange={(e) => { firstoptionHandler(e.target.value) }} style={{
                            "width": "50%",
                            " padding": "10px",
                            "margin-bottom": "10px",
                            "border": "1px solid #ccc",
                            "border-radius": "5px"
                        }}>

                            <option value={null}>Select</option>
                            {
                                participants?.map((p) => {
                                    return (
                                        <option value={p._id} > {p.name} ➡️ {p.iuno} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {
                        first_winner ?
                            <>
                                <div>
                                    <label for='secondwinner' style={{ display: 'block' }}>Second Winner</label>
                                    <select {...register('second_winner')} onChange={(e) => { secondoptionHandler(e.target.value) }} style={{
                                        "width": "50%",
                                        " padding": "10px",
                                        "margin-bottom": "10px",
                                        "border": "1px solid #ccc",
                                        "border-radius": "5px"
                                    }}>

                                        <option value={null}>Select</option>
                                        {
                                            participants?.map((p) => {
                                                if (p._id != first_winner) {
                                                    return (
                                                        <option value={p._id} > {p.name} ➡️ {p.iuno} </option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                            </>
                            : ""
                    }
                    {
                        first_winner && second_winner ?
                            <>
                                <div>
                                    <label for='thirdwinner' style={{ display: 'block' }}>Third Winner</label>
                                    <select {...register('third_winner')} onChange={(e) => { thirdoptionHandler(e.target.value) }} style={{
                                        "width": "50%",
                                        " padding": "10px",
                                        "margin-bottom": "10px",
                                        "border": "1px solid #ccc",
                                        "border-radius": "5px"
                                    }}>

                                        <option value={null}>Select</option>
                                        {
                                            participants?.map((p) => {
                                                if (p._id != first_winner && p._id != second_winner) {
                                                    return (
                                                        <option value={p._id} > {p.name} ➡️ {p.iuno} </option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                            </>
                            : ""
                    }
                    <div>
                        <input type='submit' className='btn btn-outline-danger' />
                    </div>
                </form>
            </div>
        </div>
    )
}
