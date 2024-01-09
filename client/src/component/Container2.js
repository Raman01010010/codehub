import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Canvas from "./Canvas";
import Edito from "./Editor/Editor";
import Create from "./Create/Create";
export default function Container1(){
    return(<>
    {/* <Dashboard/> */}
  
          <Routes>

          <Route path="/" element={<><Home/></>} />
          <Route path="/workspace/:id/:fid" element={<>  <Edito/></>} />
          <Route path="/my" element={<>  <Create/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}