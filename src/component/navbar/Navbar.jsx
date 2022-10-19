import "./Navbar.css"
// import { useContext } from "react"
// import {userdatacontext} from "../../App"
import { useNavigate} from "react-router-dom"

function Navbar() {

    // Delete the context API data instead use local storage info
    // const{userdata} = useContext(userdatacontext);
    // Delete the context API data instead use local storage info

    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("uuid");
        localStorage.removeItem("token");
        navigate("/login")
    }

  return (
    <div className="appbar">
            <h2 className="appbarheading">Leave Tracker</h2>
            <div className="appbarmenu">
                {localStorage.getItem("uuid") ? 
                <div className="navbarlinks">
                    <p onClick={()=> navigate("/")}>Home</p>
                    <p onClick={()=> navigate("/apply-for-a-leave")}>Apply for leave</p>
                    <p onClick={()=> navigate("/applied-leaves")}>Edit or delete yor applied leaves</p>
                    <p onClick={() => {
                        logout();
                        navigate("/forgot-pwd1")
                    }}>Update password</p>
                    <p onClick={logout}>Logout</p>
                </div> 
                : 
                <div className="navbarsinglelink">
                    <p onClick={()=> navigate("/login")}>Login</p>
                    <p onClick={()=> navigate("/create-account")}>Create Account</p>
                </div>}
            </div>
        </div>
  )
}

export default Navbar