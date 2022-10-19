import "./Home.css"
import Navbar from "../navbar/Navbar"
// import {userdatacontext} from "../../App"
import { useEffect, useState } from "react"
import { PieChart, Pie} from 'recharts';


// const base_url = "http://localhost:5000";
const base_url = "https://evvo-tech-task-backend.herokuapp.com"


function Home() {

  // Delte the context API data instaed of this we are using local storage
  // const{userdata} = useContext(userdatacontext);
  // Delte the context API data instaed of this we are using local storage

  const[response, setResponse] = useState(null);

  // This useEffect is to get the data when the component first mounts
  useEffect(() => {
      if(localStorage.getItem("uuid")){
        fetch(`${base_url}/get-user-data/${localStorage.getItem("uuid")}`, {
          method: "GET",
          headers: {
            "content-type" : "application/json",
            "x-auth-token": localStorage.getItem("token")
          }
        }).then((data)=> data.json()).then((data) => setResponse(data));
      }
  }, [])
  

    const attributes_to_show = ["Employee Name", "Sick Leaves", "Casual Leaves", "Earned Leaves", "Total No. of Leaves available", "Total No. of availed leaves", "Balance"]

    const data = response ? 
        [
          {name: 'sick leave', count: response.sick_leave, fill: "orange"},
          {name: 'earned leave', count: response.earned_leave, fill: "brown"},
          {name: 'casual leave', count: response.casual_leave, fill: "pink"},
        ] 
      : 
        [
          {name: 'sick leave', count: 0, fill: "orange"},
          {name: 'earned leave', count: 0, fill: "brown"},
          {name: 'casual leave', count: 0, fill: "pink"},
        ] 

  return (
    <div>
      <Navbar />
      {localStorage.getItem("uuid") ? 
      <div className="contentifloogedin">
        <h2>Welcome to Employee Leave Tracker portal</h2>
        <h3 className="dashboardtitle">Dashboard</h3>
        <table>
          <thead>
            <tr>
              {attributes_to_show.map((ele, index) => <th key={index}>{ele}</th>)}
            </tr>
          </thead>
          <tbody>
            {response ? 
            <tr>
              <td>{response.name}</td>
              <td>{response.sick_leave}</td>
              <td>{response.casual_leave}</td>
              <td>{response.earned_leave}</td>
              <td>{response.total_no_of_leaves}</td>
              <td>{response.total_no_of_availed_leaves}</td>
              <td>{response.balance}</td>
            </tr> 
            :
            <tr>Loading data for the employee</tr>}
          </tbody>
        </table>
        <div className="piechartcontainer">
          <h4>Visualize your leave  data</h4>
          <PieChart width={200} height={200}>
            <Pie data={data} dataKey="count" outerRadius={100} fill="green" />
          </PieChart>
          <div className="legends">
            <div className="singlelegend">
              <div style={{width: "10px", height: "10px", backgroundColor: "orange"}} className="colorbox"></div>
              <p>Sick Leave</p>
            </div>
            <div className="singlelegend">
              <div style={{width: "10px", height: "10px", backgroundColor: "brown"}} className="colorbox"></div>
              <p>Earned Leave</p>
            </div>
            <div className="singlelegend">
              <div style={{width: "10px", height: "10px", backgroundColor: "pink"}} className="colorbox"></div>
              <p>Casual Leave</p>
            </div>
          </div>
        </div>
      </div>
      : 
      <div className="contentforhomeifNotLoogedIn">
        <h2>Welcome to Employee Leave Tracker portal</h2>
        <p style={{color: "red"}}>You need to be logged in in order to continue to use Leave tracker application</p>
        <p style={{color: "red"}}>Follow the quick links in the navbar to continue</p>
      </div>}
    </div>
  )
}

export default Home