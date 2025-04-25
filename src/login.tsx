import { useState, useRef, useEffect } from 'react';
import "./login.css";
import {useNavigate} from "react-router-dom";
import {signInWithPopup} from "firebase/auth";
import {googleProvider,auth} from "./firebase.js";

const Login = () => {
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checker, setChecker] = useState("");
  const checkerRef = useRef<HTMLDivElement>(null);

  const animateChecker=()=>{if(checkerRef.current){
  const ch = checkerRef.current;
  ch.classList.add("checkerAnimClass")}
  }
  useEffect(()=>{
  if(checker){
  animateChecker()}
  },[checker]);
  const [checkerColor,setCheckerColor]=useState("ec5300");
  const handleLogin = async() => {
    try{
	    const result = await signInWithPopup(auth,googleProvider);
	    if(result){setCheckerColor("#00ff00");

	    setChecker("You are now logged in successfully!");

      setTimeout(() => {
        navigate("/home");
      }, 2000);}
    }
    catch(error) {
      setChecker(`Wrong credentials, ${error.message}`);
    }
    }
  
  const[t,setT]=useState(false);
  const[t2,setT2]=useState(false);

  return (
    <div className="loginScreen">
      <div className="titleAndLogo">
        <div className="logoC">
          <img style={{backgroundColor:"#ccc",position:"absolute",height:"100%",width:"100%"}}src="https://i.postimg.cc/J0nFJC8h/favicon-1.png" />
        </div>
        <div className="app-name"></div>
      </div>



<div className="desc"><b style={{color:"#5a3600"}}>Hybrid</b> banking, and <b style={{color:"#ec5300"}}>blockchain.</b></div>

      <div className="formAndFooter">
      <div className="notifyer"> Continue to app</div>

      {checker &&<div ref={checkerRef} style={{backgroundColor:checkerColor}} className='checkerCover'> <div className="checker">{checker}</div></div>}


      <div className="form">

        <input
          type="email"
	  value={email}
	  onFocus={()=>{setT(true);setChecker("")}}
	  onBlur={()=>setT(false)	}
	  style={{backgroundColor:t?"white":"#ffe0b2"}}
          className="input"
          placeholder="Enter email here..."
          onChange={(e) => {setEmail(e.target.value)}}
        />


        <input
          type="password"
	  value={password}
	  onFocus={()=>{setT2(true);setChecker("")}}                                        
	  style={{backgroundColor:t2?"white":"#ffe0b2"}}
	  onBlur={()=>setT2(false)}
          className="input"
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
        />

	


        <div className="button" onClick={handleLogin}>Login</div>
	</div>





        <div className="footer">
          Experience the hybrid nature of modern banking and web3, all at Bank Web
        </div>



	</div>
	<div style={{fontSize:8,color:"grey",position:'absolute',bottom:15}}>Courtesy @<b>BytanceTech</b> © 2025</div>
      
    </div>
  );
};

export default Login;
