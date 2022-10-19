import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import "./EditForm.css"
import { useFormik } from "formik";
 import * as yup from "yup"

 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



// const base_url = "http://localhost:5000";
const base_url = "https://evvo-tech-task-backend.herokuapp.com"

function EditForm() {

    const{id} = useParams();

    const[leaveapplicationdata, setleaveapplicationdata] = useState(null)

    useEffect(()=> {
        fetch(`${base_url}/get-applied-form-data/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((data) => data.json()).then((data)=> setleaveapplicationdata(data))
    }, [])

    return (
        <div>
            <Navbar />
            {leaveapplicationdata ? <EditablePrefilledForm obj={leaveapplicationdata} />  : "Loading the data....."}
        </div>
    )

}

export default EditForm


function EditablePrefilledForm({obj}){

    const navigate = useNavigate()

    // This is done to enforce a lower limit on the date selector i.e.. today (Cannot take the leave before today)
    const track = new Date();
    const date_parameter = track.toISOString().slice(0,10);

    const validateeditedform = yup.object({
        leave_type: yup.string().required(),
        start_date: yup.date().required(),
        end_date: yup.date().required(),
        comment: yup.string().required().max(50)
    })

    const formik = useFormik({
        initialValues: {leave_type: obj.leave_type, start_date: obj.start_date, end_date: obj.end_date, comment: obj.comment},
        validationSchema: validateeditedform,
        onSubmit: (values) => 
        {
            // Calculating the duration of leave
            const start_date = new Date(values.start_date);
            const end_date = new Date(values.end_date);
            const diff = (end_date.getTime() - start_date.getTime())/(1000*60*60*24);
            // Limiting the number of days the leave can be taken at a time
            if(diff > 10){
                toast.error("You can not take a leave for more than 10 days at a time. Try for smaller leaves");
            }else{
                const data2send = {
                    updated_data: values,
                    old_data: obj,
                    new_duration: diff,
                    user_id: localStorage.getItem("uuid")
                }
                fetch(`${base_url}/edit-a-existing-leave-application`, {
                    method: "POST",
                    body: JSON.stringify(data2send),
                    headers: {
                        "content-type" : "application/json",
                        "x-auth-token" : localStorage.getItem("token")
                    }
                }).then((data)=> data.json()).then((data)=>{
                        alert(data.msg);
                        // Navigate to upcomingleave sections later
                        navigate("/applied-leaves")
                })
            }
        }
    })

    return (
        <div>
            <h4 style={{textAlign: "center", color: "red"}}>Edit your prefilled data for applied leave.</h4>
            <div className="formcontainer">
                <h3>Application form for Leave</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="formele">
                        <h3 className="title">Leave Type</h3>
                        <select disabled value={formik.values.leave_type} onBlur={formik.handleBlur} onChange={formik.handleChange} name="leave_type">
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
                        value={formik.values.start_date}
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
                        value={formik.values.end_date}
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
                        value={formik.values.comment}
                        onBlur={formik.handleBlur} 
                        onChange={formik.handleChange} 
                        name="comment" 
                        cols="30" 
                        rows="10"></textarea>
                        {formik.touched.comment && formik.errors.comment ? <p style={{color: "red"}}>{formik.errors.comment}</p> : null}
                    </div>
                    <div className="btncontainer">
                        <button type="submit">Update</button>
                        <button onClick={() => navigate("/applied-leaves")}>Cancel</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
      )
}