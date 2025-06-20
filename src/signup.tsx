import { useState, useRef, useEffect } from "react";
import "./login.css";
import { setDoc, doc } from "firebase/firestore";
import { analytics } from "./firebase.ts";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth, db } from "./firebase.ts";
import { FirebaseError } from "firebase/app";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const SignUp = ({day}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [checker, setChecker] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const checkerRef = useRef<HTMLDivElement>(null);

  const [ready,setReady]=useState(false);

  useEffect(()=>{
  if(email && password && fullName){
	  console.log(email,password,fullName);
	  setReady(true)}},[email,password,fullName]);


  const [savedEmail, setSavedEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("gmail") ?? "";
    setSavedEmail(storedEmail);
  }, []);

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

  const sendVerifyMail = async () => {
    setLoading1(true);
    await axios
      .post("https://mybackend-oftz.onrender.com/postAndVerify", {
        name: fullName,
        email: email,
      })
      .then((response) => {
        setChecker(response.data.msg);
      })
      .catch((error: any) => {
        setChecker(error.response.data.msgErr || "error");
      })
      .finally(() => {
        setLoading1(false);
      });
  };

  const handleLogin = async () => {
	  await axios.post("https://mybackend-oftz.onrender.com/CSAgent",[{name:"John Doe",msg:"I am testing. This code is coming from backend. If seen, then server is good"}])
	  .then((response)=>console.log(response.data.feedback)).catch((error)=>console.error(error.message)).finally(()=>console.log("Allis done"));
	  
    if (fullName.length < 4) {
      setChecker("Full name too short to be valid");
      return;
    }

    if (email.length < 1) {
      setChecker("Put your email address first");
      return;
    }
    if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
      setChecker("Wrong email format, use valid email address");
      return;
    }

    if (password.length < 6) {
      setChecker("Password length must be up to six (6)");
      return;
    }
    if (email.includes("@gmail.com") || email.includes("@yahoo.com") && password.length >= 6) {
	    
      try {
        setLoading1(true);

        if (savedEmail == email) {
          setChecker("Email already registered. Enter another email");
          setTimeout(() => {
            setLoading1(false);
          }, 3000);
          return;
        }
        localStorage.setItem("fullName", fullName ?? "");
        localStorage.setItem("gmail", email ?? "");
        localStorage.setItem("password", password ?? "");

        await setDoc(
          doc(db, "bitbankers", `${email.split("@")[0]}-${Date.now()}`),
          {
            name: fullName,
            email: email,
            password: password,
          },
        );
        setCheckerC("black");
        setCheckerColor("#00ff00");
        setChecker("Signed up successfully ");
        setLoading1(false);
        sendVerifyMail();
        setTimeout(() => {
          navigate("/picupload");
        }, 2000);
      } catch (error: any) {
        setChecker(error.message || "Something is wrong somewhere!");
      }
    } else {
      setChecker("Wrong credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading2(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const user = result.user;
        console.log("User display name:", user.displayName);
        await setDoc(doc(db, "bitbankers", user.uid), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });

        if (savedEmail == user.email) {
          setChecker(
            `We have registered ${user.displayName} before, logging in 3s ...`,
          );

          localStorage.setItem("picURL", user.photoURL ?? "");

          setTimeout(() => {
            navigate("/home");
          }, 4000);
          return;
        }
        //if new user
        setCheckerColor("#00ff00");
        localStorage.setItem("fullName", user.displayName ?? "");
        localStorage.setItem("gmail", user.email ?? "");
        localStorage.setItem("picURL", user.photoURL ?? "");
        setDoc(doc(db, "bitbankers", user.uid), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });

        setChecker(`${user.displayName}, You have signed up successfully!`);

        setLoading2(false);

        setTimeout(() => {
          navigate("/home");
        }, 4000);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setChecker(error.message);
        setLoading2(false);
      } else {
        setChecker("There is a problem on your end!");
      }
    }
  };

  const [t, setT] = useState(false);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);

  return (
    <div className="loginScreen">
    {!day?<svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f2027" />
      <stop offset="50%" stop-color="#203a43" />
      <stop offset="100%" stop-color="#2c5364" />
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffcc11" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#techGradient)" />
  <rect width="100%" height="100%" fill="url(#gridPattern)" />
  <g stroke="#00ffcc22" stroke-width="0.5">
    <path d="M0,100 Q400,300 800,100" fill="none"/>
    <path d="M0,200 Q400,400 800,200" fill="none"/>
    <path d="M0,300 Q400,500 800,300" fill="none"/>
  </g>
</svg>:
    <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="lightGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f0f4f8" />
      <stop offset="100%" stop-color="#dce6f2" />
    </linearGradient>
    <pattern id="lightGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#99999922" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#lightGradient)" />
  <rect width="100%" height="100%" fill="url(#lightGridPattern)" />
  <g stroke="#99999933" stroke-width="0.5">
    <path d="M0,100 Q400,300 800,100" fill="none"/>
    <path d="M0,200 Q400,400 800,200" fill="none"/>
    <path d="M0,300 Q400,500 800,300" fill="none"/>
  </g>
</svg>}
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
        <div className="app-name">Bitbanker</div>
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
            type="fullName"
            value={fullName}
            onFocus={() => {
              setT3(true);
              setChecker("");
            }}
            onBlur={() => setT3(false)}
            style={{ backgroundColor: t3 ? "white" : "white" }}
            className="input"
            placeholder="Enter full name"
	    placeholderTextColor="red"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />

          <input
            type="email"
            value={email}
            onFocus={() => {
              setT(true);
              setChecker("");
            }}
            onBlur={() => setT(false)}
            style={{ backgroundColor: t ? "white" : "white" }}
            className="input"
            placeholder="Enter email here..."
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
            style={{ backgroundColor: t2 ? "white" : "white" }}
            onBlur={() => setT2(false)}
            className="input"
            placeholder="Type your password"
	    returnkeyType="Done"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="button"
	    style={{backgrounColor:ready?"#213547":"rgba(0,0,0,0.6)"}}
            onClick={() => {
              handleLogin();
              handleAnalytics();
            }}
          >
            <div className="buttonIn"
	    style={{backgrounColor:ready?"#213547":"rgba(0,0,0,0.6)"}}>
              <div className="buttonTitle">Sign up</div>
              {loading1 && (
                <ClipLoader className="loader" size={30} color="white" />
              )}
            </div>
          </button>
        </div>


        <div
          className="button"
          style={{
            marginBottom: 60,
            width: "80%",
            color: day?"white":"black",
            backgroundColor: day?"#ccc":"white",
          }}
          onClick={() => {
            handleGoogleLogin();
            handleAnalytics();
          }}
        >
          <div className="buttonIn">

	      <div className="buttonTitle"><b style={{color:"blue",fontSize:20}}>G </b> <b style={{color:"#ccc"}}>| </b>use Google</div>
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

export default SignUp;
