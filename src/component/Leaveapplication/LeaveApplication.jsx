import Navbar from "../navbar/Navbar"
import "./LeaveApplication.css"
import {useFormik} from "formik";
import * as yup from "yup"
// import { useState } from "react";

// Toaster notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


// const base_url = "http://localhost:5000";
const base_url = "https://evvo-tech-task-backend.herokuapp.com"

function LeaveApplication() {

    const navigate = useNavigate();

    // This is done to enforce a lower limit on the date selector i.e.. today (Cannot take the leave before today)
    const track = new Date();
    const date_parameter = track.toISOString().slice(0,10);


    const validateitnow = yup.object({
        leave_type: yup.string().required(),
        start_date: yup.date().required(),
        end_date: yup.date().required(),
        comment: yup.string().required().max(50)
    })

    const formik = useFormik({
        initialValues: {leave_type: "", start_date: "", end_date: "", comment: ""},
        validationSchema: validateitnow,
        onSubmit: (values) => {
            // Calculating the duration of leave
            const start_date = new Date(values.start_date);
            const end_date = new Date(values.end_date);
            const diff = (end_date.getTime() - start_date.getTime())/(1000*60*60*24);
            // Limiting the number of days the leave can be taken at a time
            if(diff > 10){
                toast.error("You can not take a leave for more than 10 days at a time. Try for smaller leaves");
            }else{
                const data2send = {
                    ...values,
                    duration: diff,
                    user_id: localStorage.getItem("uuid")
                }
                fetch(`${base_url}/create-a-leave`, {
                    method: "POST",
                    body: JSON.stringify(data2send),
                    headers: {
                        "content-type" : "application/json",
                        "x-auth-token" : localStorage.getItem("token")
                    }
                }).then((data)=> data.json()).then((data)=>{
                    if(data.msg === "Unable to draft a leave application. Please try again later."){
                        toast.error(data.msg)
                    }else{
                        alert(data.msg);
                        // Navigate to upcomingleave sections later
                        navigate("/applied-leaves")
                    }
                })
            }
        }
    })

  return (
    <div>
        <Navbar />
        <h4 style={{textAlign: "center", color: "red"}}>You can't take a leave for more than 10 days at a time.</h4>
        <div className="formcontainer">
            <h3>Application form for Leave</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="formele">
                    <h3 className="title">Leave Type</h3>
                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="leave_type">
                        <option value="">---Select---</option>
                        <option value="sick_leave">Sick Leave</option>
                        <option value="casual_leave">Casual Leave</option>
                        <option value="earned_leave">Earned Leave</option>
                    </select>
                    {formik.touched.leave_type && formik.errors.leave_type ? <p style={{color: "red"}}>{formik.errors.leave_type}</p> : null}
                </div>
                <div className="formele">
                    <h3 className="title">Start Date</h3>
                    <input 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    name="start_date" 
                    type="date" 
                    min={date_parameter} 
                    max="2022-12-31" />
                    {formik.touched.start_date && formik.errors.start_date ? <p style={{color: "red"}}>{formik.errors.start_date}</p> : null}
                </div>
                <div className="formele">
                    <h3 className="title">End Date</h3>
                    <input 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    name="end_date" 
                    type="date" 
                    min={date_parameter} 
                    max="2022-12-31" />
                    {formik.touched.end_date && formik.errors.end_date ? <p style={{color: "red"}}>{formik.errors.end_date}</p> : null}
                </div>
                <div className="formele1">
                    <h3 className="title1">Comments</h3>
                    <textarea 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    name="comment" 
                    cols="30" 
                    rows="10"></textarea>
                    {formik.touched.comment && formik.errors.comment ? <p style={{color: "red"}}>{formik.errors.comment}</p> : null}
                </div>
                <div className="btncontainer">
                    <button type="submit">Submit</button>
                    <button onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default LeaveApplication