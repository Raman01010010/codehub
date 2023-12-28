import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Canvas from "./Canvas";
export default function Container1(){
    return(<>
    <Dashboard/>
    <Canvas/>
          <Routes>

          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}