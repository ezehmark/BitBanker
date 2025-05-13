import { useState, useRef, useEffect } from "react";
import "./login.css";
import { analytics } from "./firebase.ts";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "./firebase.ts";
import { ClipLoader } from "react-spinners";


const Login = () => {
  const navigate = useNavigate();
  const[savedGmail,setSavedGmail]=useState<string>("");
  const[savedPassword,setSavedPassword]=useState<string>("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checker, setChecker] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const checkerRef = useRef<HTMLDivElement>(null);

  const animateChecker = () => {
    if (checkerRef.current) {
      const ch = checkerRef.current;
      ch.classList.add("checkerAnimClass");
    }
  };
  useEffect(() => {
    if (checker) {
      animateChecker();
    }
  }, [checker]);
  const [checkerColor, setCheckerColor] = useState("ec5300");
  const [checkerC, setCheckerC] = useState("white");

  const handleAnalytics = () => {
    logEvent(analytics, "Hitting Sign up", { Button: "ContinueWithGoogleBtn" });
  };

  useEffect(()=>{
	  const storedEmail = localStorage.getItem("email");
	  const storedPassword = localStorage.getItem("password");
  setSavedPassword(storedPassword !== null ? storedPassword:"");
  setSavedGmail(storedEmail !== null ? storedEmail : "")},[]);

  const handleLogin = () =>{
      
        setLoading1(true);
	if(password.length <1){setChecker("Please enter your password");setLoading1(false);return}
	if(email.length < 1){setChecker("Please type email youraddress");setLoading1(false);return;}

	if(!email.includes("@gmail.com" || "@yahoo.com" || ".live")){setChecker("Wrong email format!");setLoading1(false);return;}

	

        if (savedGmail == email && savedPassword == password) {
		setLoading1(true);
          setCheckerColor("#00ff00");
	  setCheckerC("black");
	  setChecker("You are logged back in 3s...");

          setTimeout(()=>{navigate("/home")},4500);
        }
      
     else {
      setChecker("Wrong credentials");setTimeout(()=>{setLoading1(false)},3000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading2(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const user = result.user;
          if(user.email !==savedGmail){
		  setCheckerColor("#00ff00");
		  setCheckerC("black");
	setChecker(`Account created for ${user.displayName} and auto-login   3s ...`);

	  localStorage.setItem("fullName", user.displayName?? "Your name");
        localStorage.setItem("gmail", user.email??"");                      localStorage.setItem("picURL", user.photoURL??"");

          setTimeout(() => {
            navigate("/home");
          }, 4000);
          return;}
	  setCheckerColor("#00ff00");
	  setCheckerC("black");
	  setChecker("You are logged back in");
	  setTimeout(()=>{navigate("/home")},4500);
        }
	else{setCheckerColor("#ec5300");setCheckerC("black");
		setChecker("There is an error, please retry...");
	setLoading2(false)}
    }
	catch(error:any){setChecker(error.message || "Broken request")}
  };

  const [t, setT] = useState(false);
  const [t2, setT2] = useState(false);

  return (
    <div className="loginScreen">
      <div className="titleAndLogo">
        <div className="logoC">
          <img
            style={{
              backgroundColor: "#ccc",
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            src="https://i.postimg.cc/J0nFJC8h/favicon-1.png"
          />
        </div>
        <div className="app-name">BitBanker™</div>
      </div>

      <div className="formAndFooter">
        <div className="notifyer"> Continue to app</div>

        {checker && (
          <div
            ref={checkerRef}
            style={{ color: checkerC, backgroundColor: checkerColor }}
            className="checkerCover"
          >
            
            <div className="checker">{checker}</div>
          </div>
        )}

        <div className="form">

          <input
            type="email"
            value={email}
            onFocus={() => {
              setT(true);
              setChecker("");
            }}
            onBlur={() => setT(false)}
            style={{ backgroundColor: t ? "white" : "#ffe0b2" }}
            className="input"
            placeholder="Type registered email."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            value={password}
            onFocus={() => {
              setT2(true);
              setChecker("");
            }}
            style={{ backgroundColor: t2 ? "white" : "#ffe0b2" }}
            onBlur={() => setT2(false)}
            className="input"
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="button"
            onClick={() => {
              handleLogin();
              handleAnalytics();
            }}
          >
            <div className="buttonIn">
              <div className="buttonTitle">Login</div>
              {loading1 && (
                <ClipLoader className="loader" size={30} color="white" />
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          Experience the hybrid of banking and web3, all at BitBanker™.
        </div>

        <div
          className="button"
          style={{width:"80%",backgroundColor:"#00f0a9"}}onClick={() => {
            handleGoogleLogin();
            handleAnalytics();
          }}
        >
          <div className="buttonIn">
            <div className="buttonTitle">Continue with  Google</div>
            {loading2 && (
              <ClipLoader className="loader" size={30} color="white" />
            )}
          </div>
        </div>
      </div>
      <div
        style={{ fontSize: 8, color: "grey", position: "absolute", bottom: 15 }}
      >
        Courtesy @<b>BytanceTech</b> © 2025
      </div>
    </div>
  );
};

export default Login;
