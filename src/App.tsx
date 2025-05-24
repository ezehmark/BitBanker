import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home.tsx";
import SignUp from "./signup.tsx";
import UploadPic from "./picupload.tsx";
import Login from "./login.tsx";
import Menu from "./menuPanel.tsx";
import Profile from "./profile.tsx";


export default function App() {
const [openMenu,setOpenMenu]=useState(false);
const toggleMenu =()=>{
setOpenMenu(x=>!x)}


const[openProfile,setOpenProfile]=useState(false);              const toggleProfile =()=>{                                    setOpenProfile(y=>!y)}
  return (<>

{openMenu && <Menu setOpenMenu={setOpenMenu}/>}
{openProfile && <Profile setOpenProfile={setOpenProfile}/>}


    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home  toggleProfile={toggleProfile} toggleMenu={toggleMenu}  />} />
        <Route path="/picupload" element={<UploadPic />} />
	<Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </>
  );
}

