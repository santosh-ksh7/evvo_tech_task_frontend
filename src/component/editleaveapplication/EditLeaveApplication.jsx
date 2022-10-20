import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import "./EditLeaveApplication.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


// const base_url = "http://localhost:5000";
const base_url = "https://evvo-tech-task-backend.herokuapp.com"

function EditLeaveApplication() {
    const[allleaves, setAllleaves] = useState(null)

    useEffect(() => {
      if(localStorage.getItem("uuid")){
        fetch(`${base_url}/all-leaves-applied/${localStorage.getItem("uuid")}`,{
            method: "GET",
            headers: {
                "content-type" : "application/json",
                "x-auth-token" : localStorage.getItem("token")
            }
        }).then((data)=> data.json()).then((data)=> setAllleaves(data))
      }
    }, [])
    
  return (
    <div>
        <Navbar />
        <h3 style={{textAlign: "center"}}>All your applied leaves</h3>
        <div >
            {allleaves ? 
                <div>
                    {allleaves[0] ? 
                        <div className="appliedleaves">
                            <table>
                                <thead>
                                    <tr style={{backgroundColor: "blue", color: "white"}}>
                                        <th>Leave type</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Comments</th>
                                        <th>Duation</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allleaves.map((ele,index) => <DisplaySingleLeave obj={ele} key={index} setAllleaves={setAllleaves} />)}
                                </tbody>
                            </table>
                        </div> 
                        :
                        <p style={{textAlign: "center", color: "red"}}>You have not applied for any leave application till now</p>
                    }
                </div>
            : <p style={{textAlign: "center", color: "red"}}>Loading your data.....</p>}
        </div>
        <ToastContainer />
    </div>
  )
}

export default EditLeaveApplication

function DisplaySingleLeave({obj, setAllleaves}){

    const navigate = useNavigate();

    function run(obj){
        fetch(`${base_url}/delete-a-leave-application`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type" : "application/json",
                "x-auth-token" : localStorage.getItem("token")
            }
        }).then((data) => data.json()).then((data) => setAllleaves(data))
    }

    return(
            <tr>
                <td>{obj.leave_type}</td>
                <td>{obj.start_date}</td>
                <td>{obj.end_date}</td>
                <td>{obj.comment}</td>
                <td>{obj.duration}</td>
                <td><EditIcon onClick={()=> navigate(`/edit-a-application/${obj._id}`)} sx={{cursor: "pointer", color: "blue"}} /></td>
                <td><DeleteIcon onClick={()=> run(obj)} sx={{cursor: "pointer", color: "red"}} /></td>
            </tr>
    )
}