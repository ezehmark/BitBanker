import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./login.css";

export default function CSChats() {
  const breakLimit = 768;
  const wWidth = window.innerWidth;

  const [chat, setChat] = useState("");
  const [checker, setChecker] = useState("");

  const sendMsg = async (e) => {
	e.preventDefault();
    setLoading1(true);
    await axios
      .post("https://mybackend-oftz.onrender.com/CSAgent", [
        { name: "John Doe", msg: chat },
      ])
      .then((response) => setChecker(response.data.feedback))
      .catch((error) => setChacker(error.message))
      .finally(() => {
        setChat("");
        console.log("All is done");
        setLoading1(false);
      });
  };

  const [t, setT] = useState(false);
  const [loading1, setLoading1] = useState(false);

  return (wWidth >= breakLimit ? 
    <div className="loginScreen">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {" "}
        <defs>
          <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="1">
            {" "}
            <stop offset="0%" stop-color="#0f2027" />{" "}
            <stop offset="50%" stop-color="#203a43" />{" "}
            <stop offset="100%" stop-color="#2c5364" />{" "}
          </linearGradient>{" "}
          <pattern
            id="gridPattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {" "}
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#00ffcc11"
              stroke-width="1"
            />{" "}
          </pattern>
        </defs>{" "}
        <rect width="100%" height="100%" fill="url(#techGradient)" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
        <g stroke="#00ffcc22" stroke-width="0.5">
          <path d="M0,100 Q400,300 800,100" fill="none" />
          <path d="M0,200 Q400,400 800,200" fill="none" />
          <path d="M0,300 Q400,500 800,300" fill="none" />
        </g>
      </svg>
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
        <div style={{ color: "white" }} className="app-name">
          CS Client
        </div>
      </div>

      <div className="formAndFooter"
      style={{justifyContent:"space-around",flexDirection:"row",     display:"flex"}}>
        <div className="notifyer"
	style={{fontSize:40}}>Live Customer Support 24/7</div>
	<div style={{height:"100%",width:"100%"}}>

        {checker && (
          <div
            style={{ color: "black", backgroundColor: "#00d4d4" }}
            className="checkerCover"
          >
            <div className="checker">{checker}</div>{" "}
          </div>
        )}

        <form className="form">
          <input
            type="text"
            value={chat}
            onFocus={() => {
              setT(true);
              setChecker("");
            }}
            onBlur={() => setT(false)}
            style={{ height:150,textAlign:"top",backgroundColor: t ? "white" : "white" }}
            className="input"
            placeholderColor={"#ccc"}
            placeholder="Make complaints or commend us here..."
            onChange={(e) => {
              setChat(e.target.value);
            }}
          />

          <button
            className="button"
            style={{ overflow: "hidden", width:"50%",backgroundColor: "#00d4d4" }}
            onClick={() => {
              sendMsg();
            }}
          >
            <div className="buttonIn" style={{ backgroundColor: "#00d4d4" }}>
              <div className="buttonTitle">
                {loading1 ? "Sending" : "Send now"}
              </div>
            </div>
          </button>
        </form>
	</div>
      </div>
    </div>
   : 
    <div className="loginScreen">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f2027" />
            <stop offset="50%" stop-color="#203a43" />
            <stop offset="100%" stop-color="#2c5364" />
          </linearGradient>
          <pattern
            id="gridPattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#00ffcc11"
              stroke-width="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGradient)" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
        <g stroke="#00ffcc22" stroke-width="0.5">
          <path d="M0,100 Q400,300 800,100" fill="none" />
          <path d="M0,200 Q400,400 800,200" fill="none" />
          <path d="M0,300 Q400,500 800,300" fill="none" />
        </g>
      </svg>
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
        <div style={{ color: "white" }} className="app-name">
          CS Client
        </div>
      </div>

      <div className="formAndFooter">
        <div className="notifyer">Live Customer Support 24/7</div>

        {checker && (
          <div
            style={{ color: "black", backgroundColor: "#00d4d4" }}
            className="checkerCover"
          >
            <div className="checker">{checker}</div>
          </div>
        )}

        <div className="form">
          <input
            type="text"
            value={chat}
            onFocus={() => {
              setT(true);
              setChecker("");
            }}
            onBlur={() => setT(false)}
            style={{ backgroundColor: t ? "white" : "white" }}
            className="input"
            placeholderColor={"#ccc"}
            placeholder="Make complaints or commend us here..."
            onChange={(e) => {
              setChat(e.target.value);
            }}
          />

          <button
            className="button"
            style={{ overflow: "hidden", backgroundColor: "#00d4d4" }}
            onClick={() => {
              sendMsg();
            }}
          >
            <div className="buttonIn" style={{ backgroundColor: "#00d4d4" }}>
              <div className="buttonTitle">
                {loading1 ? "Sending" : "Send now"}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
