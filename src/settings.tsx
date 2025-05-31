import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./settings.css";

export default function Settings({day,toggleDay}){


const [dayMode,setDayMode]=useState("Night Mode");
const navigate = useNavigate();



return(<>

<div className="settingsBox">
<h2>Settings</h2>

<div className="dayModeRow">
<label id ="label" htmlFor="dayToggle">{dayMode}</label>
<input  
type="checkbox" 
id="dayToggle" 
checked={!day}
onChange={toggleDay}/>
</div>
<button style={{padding:"10px 40px",backgroundColor:"#00d4d4",alignItems:"center",justifyContent:"center",fontSize:15,color:"#213547",position:"absolute",bottom:100}}
onClick={()=>{navigate("/")}}>Done</button>
</div>

</>)
}
