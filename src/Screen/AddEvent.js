import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import './addeventstyle.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AddEvent = () => {

    // const organizer = useParams().org
    // const [organizer, setorganizer] = useState(useParams().org)


    const [organizer, setorganizer] = useState(localStorage.getItem('org'))
    const { register, handleSubmit } = useForm()
    const [resFile, setresFile] = useState()
    const navigate = useNavigate()

    const mysubmit = async (data) => {

        data.Organizedby = organizer
        document.getElementById('sbt').style.display = 'none'


        var filename = data?.image[0].name
        console.log("data", data);
        console.log("file", filename);

        var formData = new FormData()
        formData.append('file', data.image[0])
        console.log('submit called', data)

        await axios.post(`http://localhost:5000/api/event/addeventimage`, formData).then((res) => {
            setresFile(res.data)
            console.log('res of file--', res.data)
            data.image = './Images/'+res.data.file.originalname
        }).catch((e)=>{
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
        

        await axios.post('http://localhost:5000/api/event/addevent', data).then((res) => {
            console.log(res.data);
            if (res.data) {
                toast('Event Added ✅', {
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
            }
        }).catch((e)=>{
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
    }


    useEffect(() => {

        if (!localStorage.getItem('org')) {
            alert('YOu are not allowed to add event')
            navigate('/')
        }

    }, [organizer])




    return (
        <div class="event-form" id='body'>
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
            <h2>Add Event Form</h2>
            <div class="form-container">

                <form onSubmit={handleSubmit(mysubmit)}>
                    <div class="form-group">
                        <label for="ename">Event Name</label>
                        <input type="text" {...register('name')} id="ename" required />
                    </div>

                    <div class="form-group">
                        <label for="eorganiser">Event Organizer</label>
                        <input type="text" id="eorganiser" value={`${organizer}`} {...register('Organizedby')} disabled />
                    </div>

                    <div class="form-group">

                        <label for="eimage">Event Image</label>
                        <input type='file' id='eimage' {...register('image')} />
                        {/* <button className='btn btn-success' onClick={(e)=>{fileHandler(e)}}>UPLOAD</button> */}

                    </div>

                    <div class="form-group">
                        <label for="edesc">Event Description</label>
                        <textarea id="edesc" rows='5' cols='5' {...register('description')} required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="edate">Event Date</label>
                        <input type="date" id="edate" {...register('date_of_event')} required />
                    </div>

                    <div class="form-group">
                        <label for="evenue">Event Venue</label>
                        <input type="text" id="evenue" {...register('venue')} required />
                    </div>

                    <div class="form-group">
                        <input type="submit" id="sbt" value="Submit" />
                    </div>
                </form>
            </div>
        </div>

    )
}
