import "./Frogotpwd1.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';


// react toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const base_url = "http://localhost:5000";
const base_url = "https://evvo-tech-task-backend.herokuapp.com"


export function Forgotpwd1() {

  const navigate = useNavigate();

  const forgotpwd1schema = yup.object({
    email: yup.string().required().email(),
  })

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: forgotpwd1schema,
    onSubmit: (values) => {
      // fetch the API in order to get OTP to your registered email
      fetch(`${base_url}/reset-pwd1`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json"
        }
      }).then((data)=>data.json()).then((data)=>{
        if(data.msg==="email is not registered. Make sure the email is registered with us"){
          toast.error(data.msg)
        }else{
          alert(data.msg)
          // store registered email of user in local storage to complete further process of reset password
          localStorage.setItem("email", data.email)
          // navigate to validate OTP page
          navigate("/forgot-pwd2")
        }
      })
    }
  })

  return (
    <div className="fp1">
        <div>
            <h2>Evvp tech</h2>
            <p>Welcome to Leave Tracker</p>
            <h4>Reset Password</h4>
            <p>Enter the registered e-mail associated with your account to validate</p>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    style={{width: "300px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    error= {formik.touched.email && formik.errors.email ? true : false}
                    id="standard-error-helper-text"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        ),
                    }}
                    label="Registered Email ID"
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    variant="standard"
                />
                <button style={{marginTop: "10px"}} type="submit">Validate email</button>
            </form>
            <p style={{color: "grey"}}>----------or---------</p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/login">Back to Sign-in</Link>
            </p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/create-account">New to MyTravelCompanion? Create Account</Link>
            </p>
        </div>
        <ToastContainer />
    </div>
  )
}