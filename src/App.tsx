import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home.tsx";
import SignUp from "./signup.tsx";
import UploadPic from "./picupload.tsx";
import Login from "./login.tsx";
import Menu from "./menuPanel.tsx";
import Profile from "./profile.tsx";

import Settings from "./settings.tsx";
import FeatureBox from "./featureBox.tsx";


export default function App() {
const [openMenu,setOpenMenu]=useState(false);
const toggleMenu =()=>{
setOpenMenu(x=>!x)}

const[day,setDay]=useState(true);
function toggleDay(){
setDay(now=>!now)}


const[openProfile,setOpenProfile]=useState(false);              
const toggleProfile =()=>{                                    
	setOpenProfile(y=>!y)}
  return (<>





    <Router>
    <>

    {openMenu && <Menu day={day} toggleDay={toggleDay}                            setOpenMenu={setOpenMenu}/>}
{openProfile && <Profile setOpenProfile={setOpenProfile}/>}
{<FeatureBox day={day}/>}
      <Routes>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home  toggleProfile={toggleProfile} toggleMenu={toggleMenu} day={day} toggleDay={toggleDay}  />} />
	<Route path="/Settings" element={<Settings day={day} toggleDay={toggleDay}/>}/>
        <Route path="/picupload" element={<UploadPic />} />
	<Route path="/login" element={<Login/>}/>
      </Routes>
      </>
    </Router>
    </>
  );
}

