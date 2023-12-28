import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Otp from "./Otp";
import Persist from "./Persist";
export default function Container1(){
    return(<>
    <Persist/>
          <Routes>

          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
    </Routes>

    </>)
}