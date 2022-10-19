import './App.css';
// import { createContext, useState } from 'react';
import {Routes, Route} from "react-router-dom";
import { Login } from './component/login/Login';
import Home from './component/home/Home';
import { CreateAccount } from './component/createaccount/CreateAccount';
import { Forgotpwd1 } from './component/forgotpassword/Forgotpwd1'; 
import { Forgotpwd2 } from './component/forgotpassword/Forggotpwd2';
import LeaveApplication from './component/Leaveapplication/LeaveApplication';
import EditLeaveApplication from './component/editleaveapplication/EditLeaveApplication';
import EditForm from './component/editcomponent/EditForm';


// Not using this context API anymore
// export const userdatacontext = createContext();

function App() {
  // This is to track if user is looged in or not
  // Not using this context API anymore
  // const[userdata, setUserdata] = useState(false)

  return (
    // <userdatacontext.Provider value={{userdata, setUserdata}} >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-pwd1" element={<Forgotpwd1 />} />
          <Route path="/forgot-pwd2" element={<Forgotpwd2 />} />
          <Route path="/apply-for-a-leave" element={<LeaveApplication />} />
          <Route path="/applied-leaves" element={<EditLeaveApplication />} />
          <Route path="/edit-a-application/:id" element={<EditForm />} />
        </Routes>
      </div>
    // </userdatacontext.Provider>
  );
}

export default App;
