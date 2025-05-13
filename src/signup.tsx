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


const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [checker, setChecker] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const checkerRef = useRef<HTMLDivElement>(null);

  const[savedEmail,setSavedEmail]=useState<string>("");  

  useEffect(()=>{
	  const storedEmail = localStorage.getItem("email");
  setSavedEmail(storedEmail !== null? storedEmail: "")},[]);

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

  const handleLogin = async () => {
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
    if (email.includes("@gmail.com" || "@yahoo.com") && password.length >= 6) {
      try {
        setLoading1(true);

        if (savedEmail == email) {
          setChecker("Email already registered. Enter another email");
          setTimeout(() => {
            setLoading1(false);
          }, 3000);
          return;
        }
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("gmail", email);
        localStorage.setItem("password", password);

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
            name: user.displayName,                                         email: user.email,                                              photo: user.photoURL,
          });



        if (savedEmail == user.email) {
          setChecker(
            `We have registered ${user.displayName} before, logging in 3s ...`,
          );

          localStorage.setItem("picURL", user.photoURL);

          setTimeout(() => {
            navigate("/home");
          }, 4000);
          return;
        }
//if new user
        setCheckerColor("#00ff00");
        localStorage.setItem("fullName", user.displayName);
        localStorage.setItem("gmail", user.email);
        localStorage.setItem("picURL", user.photoURL);
        setDoc(doc(db, "bitbankers", user.uid), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });

        setChecker(`${user.displayName}, You have signed up successfully!`);

        setLoading2(false);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
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
    <div className="blurComp1"></div>
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
            type="fullName"
            value={fullName}
            onFocus={() => {
              setT3(true);
              setChecker("");
            }}
            onBlur={() => setT3(false)}
            style={{ backgroundColor: t3 ? "white" : "#ffe0b2" }}
            className="input"
            placeholder="Enter full name"
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
            style={{ backgroundColor: t ? "white" : "#ffe0b2" }}
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
              <div className="buttonTitle">Sign up</div>
              {loading1 && (
                <ClipLoader className="loader" size={30} color="white" />
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          Experience the hybrid of banking and web3, all at BitBanker™.
        </div>
	  <div className="blurComp2"></div>

        <div
          className="button"
          style={{
            marginBottom: 60,
            width: "50%",
            color: "white",
            backgroundColor: "#00f0a9",
          }}
          onClick={() => {
            handleGoogleLogin();
            handleAnalytics();
          }}
        >
          <div className="buttonIn">
            <div className="buttonTitle">Use Google</div>
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
