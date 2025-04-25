import { useState, useRef, useEffect } from 'react';
import "./login.css";
import {setDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {signInWithPopup} from "firebase/auth";
import {googleProvider,auth, db} from "./firebase.ts";
import {FirebaseError} from "firebase/app";

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

  const handleLogin = async () => {
    if (email.length < 1) {
      setChecker("Put your email address first");
      return;
    }
    if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
      setChecker("Wrong email format, use valid email address");
      return;
    }
    if (email === "onyekabanks@gmail.com" && password === "Onyeka4545") {


	await setDoc(doc(db,"bitbankers",String(email.length)),{
	name:email.split("@")[0],
	email:email,
	password:password});
      setCheckerColor("#00ff00");
      setChecker("You are now logged in");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setChecker("Wrong credentials");
    }
  };

  const handleGoogleLogin = async() => {
    try{
	    const result = await signInWithPopup(auth,googleProvider);
	    if(result){

	const user = result.user;
	console.log("User display name:", user.displayName);
	await setDoc(doc(db,"bitbankers",user.uid),{
	name:user.displayName,
	email:user.email,
	pic:user.photoURL})

	setCheckerColor("#00ff00");
	

	setChecker(`${user.displayName}, you are now logged in successfully!`);

      setTimeout(() => {
        navigate("/home");
      }, 2000);}
    }
    catch(error:unknown) {
	    if(error instanceof FirebaseError){
      setChecker(error.message);
    }
    else{setChecker("There is a problem on your end!")}}
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

	


        <div className="button" onClick={handleLogin}>Sign up</div>

	</div>





        <div className="footer">
          Experience the hybrid nature of modern banking and web3, all at Bank Web
        </div>

	<div className="button" style={{width:"50%",backgroundColor:"#ec5300"}}onClick={handleGoogleLogin}>Use Google</div>



	</div>
	<div style={{fontSize:8,color:"grey",position:'absolute',bottom:15}}>Courtesy @<b>BytanceTech</b> © 2025</div>
      
    </div>
  );
};

export default Login;
