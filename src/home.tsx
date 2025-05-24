import { useState, useEffect, useRef, useCallback } from "react";
import "./home.css";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { analytics } from "./firebase.ts";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

function Home({toggleProfile,toggleMenu}:{toggleMenu:()=>void,toggleProfile:()=>void}) {

const [darkTheme,setDarkTheme]=useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState("1300450");
  const [btc, setBtc] = useState("900000");
  const [eth, setEth] = useState("300000");
  const [sol, setSol] = useState("250000");

  const [name, setName] = useState("null_user");
  const [picUrl, setPicUrl] = useState("");

  const navigate = useNavigate();

  const breakpoint = 768;

  const [isMobile,setIsMobile]=useState(window.innerWidth < breakpoint);


  const[scrollOpacity,setScrollOpacity]=useState(0);
const maxScroll= 200;

useEffect(()=>{
const handleScroll = ()=>{
const activeScroll = window.scrollY
if(scrollOpacity < 1){const newOpacity = Math.min(1,activeScroll/maxScroll);
setScrollOpacity(newOpacity);}}

window.addEventListener("scroll",handleScroll);
return()=>window.removeEventListener("scroll",handleScroll);
},[scrollOpacity]);

  useEffect(()=>{
	  const handleScreenSize = ()=>{
	setIsMobile(window.innerWidth < breakpoint)}

	window.addEventListener("resize",handleScreenSize);
	return()=>window.removeEventListener("resize",handleScreenSize);
  },[]);

  const initParticles = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    const savedPicURL = localStorage.getItem("picURL");

    setName(storedName !== null ? storedName : "");
    setPicUrl(savedPicURL !== null ? savedPicURL : "");
  }, []);

  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [solPrice, setSolPrice] = useState<string | null>(null);

  const btcPriceRef = useRef<string | null>(null);
  const ethPriceRef = useRef<string | null>(null);
  const solPriceRef = useRef<string | null>(null);

  const [btcColor, setBtcColor] = useState("white");
  const [ethColor, setEthColor] = useState("white");
  const [solColor, setSolColor] = useState("white");

  useEffect(() => {
    logEvent(analytics, "Screen_Views", { screen: "home" });
  }, []);

  useEffect(() => {
    let myWs: WebSocket;
    let updateTimeout: ReturnType<typeof setTimeout>;

    const updatePrices = () => {
      myWs = new WebSocket("wss://stream.bybitglobal.com/v5/public/spot");

      myWs.onopen = () => {
        myWs.send(
          JSON.stringify({
            op: "subscribe",
            args: [
              "publicTrade.BTCUSDT",
              "publicTrade.ETHUSDT",
              "publicTrade.SOLUSDT",
            ],
          }),
        );
      };

      myWs.onmessage = (info) => {
        const myData = JSON.parse(info.data);

        if (myData.topic?.startsWith("publicTrade") && myData.data.length > 0) {
          const symbol = myData.topic.split(".")[1];
          const price = myData.data[0].p;

          let totalBtc = 0;
          let totalEth = 0;
          let totalSol = 0;
          if (symbol === "BTCUSDT") {
            const prev = btcPriceRef.current
              ? parseFloat(btcPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP < prev) setBtcColor("#ec5300");
            else if (currentP > prev) setBtcColor("#feb819");
            else {
              setBtcColor("#ccc");
            }
            btcPriceRef.current = price;
            setBtcPrice(price);
            console.log("Price updated live, BTCUSDT:", price);
            totalBtc = Number(price) * 12;
            setBtc(totalBtc.toString());
          }

          if (symbol === "ETHUSDT") {
            const prev = ethPriceRef.current
              ? parseFloat(ethPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP > prev) {
              setEthColor("#feb819");
            } else if (currentP < prev) {
              setEthColor("#ec5300");
            } else {
              setEthColor("#ccc");
            }

            setEthPrice(price);
            ethPriceRef.current = price;

            totalEth = Number(price) * 12;
            setEth(totalEth.toString());
          }

          if (symbol === "SOLUSDT") {
            const prev = solPriceRef.current
              ? parseFloat(solPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP > prev) {
              setSolColor("#feb819");
            } else if (currentP < prev) {
              setSolColor("#ec5300");
            } else {
              setSolColor("#ccc");
            }
            setSolPrice(price);
            solPriceRef.current = price;
            totalSol = Number(price) * 12;
            setSol(totalSol.toString());
          }
          const btcVal = btcPriceRef.current
            ? parseFloat(btcPriceRef.current) * 12
            : 0;
          const ethVal = ethPriceRef.current
            ? parseFloat(ethPriceRef.current) * 120
            : 0;
          const solVal = solPriceRef.current
            ? parseFloat(solPriceRef.current) * 500
            : 0;
          const totalValue = btcVal + ethVal + solVal;
          setTotal(totalValue.toString());
        }
      };

      myWs.onclose = () => {
        console.warn("WebSocket disconnected. Reconnecting in 4s...");
        updateTimeout = setTimeout(updatePrices, 4000);
      };

      myWs.onerror = () => {
        myWs.close(); // trigger reconnect
      };
    };
    updatePrices();

    return () => {
      if (myWs) myWs.close();
      if (updateTimeout) clearTimeout(updateTimeout);
    };
  }, []);

  const handleAnim1 = () => {
    if (topRef.current && button2Ref.current) {
      const top = topRef.current;
      const button2 = button2Ref.current;
      top.classList.remove("animClass");
      void top.offsetWidth;
      top.classList.add("animClass");
      setTimeout(() => {
        top.classList.remove("animClass2");
        button2.classList.toggle("button2-show");
      }, 4000);
    }
  };

  const handleAnim2 = () => {
    if (topRef.current && button2Ref.current) {
      const top = topRef.current;
      const button2 = button2Ref.current;
      button2.style.backgroundColor = "#ef9800";
      top.classList.remove("animClass2");

      top.classList.add("animClass2");
      setTimeout(() => {
        top.classList.remove("animClass");
      }, 4000);
      setTimeout(() => {
        button2.classList.toggle("button2-show");
      }, 100);
    }
  };


  return (
    <>

    <div className="tsParticles" style={{ position: "absolute", zIndex:1,width: "100vw",backgroundImage:                                             'url("https://i.postimg.cc/L6fhJ6Dy/file-000000005f2c62468e48d3172131c61a-2.jpg")',                                 backgroundSize: "cover",height: 1400 }}>                                                      <Particles                                                   id="tsparticles"
              init={initParticles}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
        
              }}
              options={{
                background: { color: "transparent" },
                particles: {
                  number: { value: 80 },
                  size: { value:isMobile? 0.8:1},
                  color: { value: "#131314" },
                  links: {
                    enable: true,
                    distance: 100,
                    color: "#d50204",
                    opacity: 0.5,
                    width: isMobile?0.4 :0.7,                                              },                                                         move: { enable: true, speed: 0.5 },                      },                                                         interactivity: {                                             events: { onHover: { enable: true, mode: "repulse" } },                                                               modes: { repulse: { distance: 80 } },                   },                                                       }}                                                       />                                                       </div>
      <div className="topHeading" style={{}}>
      <div className="menu" onClick={()=>{toggleMenu();console.warn("menu toggled")}}>
      <img src = {darkTheme                                               ? "https://i.postimg.cc/B65wgYfV/images-41.jpg"                                                                       : "https://i.postimg.cc/3xCFDfww/Picsart-25-05-04-05-37-21-849.png"} style={{position:"absolute",height:"100%",width:"100%"}}/>


          </div>

	  <div className="title" style={{left:isMobile?"50%":100}}>Bitbanker</div>


      
        <div onClick={()=>{navigate("/login")}} className="signInButton">Sign in</div>
      </div>
      <div
        className="container"
        style={{
          backgroundColor:"transparent",zIndex:22
        }}
      ><h1 className="heading1" style={{opacity:scrollOpacity,transition:'scrollOpacity 0.2s ease-in'}}>Enjoy the benefits of a hybrid economy. <b>Crypto</b> <b>meets</b> <b>banking...</b></h1><div className="outer" style={{flexDirection:isMobile?"column":"row"}}>

          <div className="live-tickers">
            <div className="table-title">
              <div>Coins</div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <div>Price</div>
                <div
                  style={{
                    borderRadius: 2,
                    alignItems: "center",
                    padding: "2px 2px 2px 3px",
                    border: "1px solid #5a3600",
                    fontSize: 10,
                  }}
                >
                  
                  USDT<b style={{ filter: "grayscale(30%)" }}>🔻</b>
                </div>
              </div>
            </div>
            <div className="ticker1">
              <div>BTC</div>
              <div style={{ color: btcColor }}>
                {btcPrice == null
                  ? "Loading..."
                  : Number(btcPrice).toLocaleString("en-us")}
              </div>
            </div>
            <div className="ticker1">
              <div>ETH</div>
              <div style={{ color: ethColor }}>
                {ethPrice == null
                  ? "Loading..."
                  : Number(ethPrice).toLocaleString("en-us")}
              </div>
            </div>
            <div className="ticker1">
              <div>SOL</div>
              <div style={{ color: solColor }}>
                {solPrice == null
                  ? "Loading..."
                  : Number(solPrice).toLocaleString("en-us")}
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "100%",
                height: 40,
                color: "#291900",
                backgroundColor: "#c77700",
              }}
            >
              The prices above reflect real-time cryptocurrency prices. Tickers
              are tracked live.
            </div>
          </div>

          <div
            style={{
              width: "85%",
              justifyContent: "space-between",
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <div className="deposit">Deposit</div>
            <div className="withdraw">Withdraw</div>
          </div>

          <div className="transactions">
            <div
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "#5a3600",
                marginRight: 10,
              }}
            >
              Transactions history
            </div>
            {[
              {
                id: 1,
                amount: "$40,000",
                status: "✔️",
                tId: "2504D56A...",
                type: "Credit",
              },
              {
                id: 2,
                amount: "$300,000",
                status: "✔️",
                tId: "2504G5A...",
                type: "Debit",
              },
              {
                id: 3,
                amount: "$106,000",
                status: "✔️",
                tId: "2504D76B...",
                type: "Credit",
              },
              {
                id: 4,
                amount: "$200,000",
                status: "✔️",
                tId: "2504D76B...",
                type: "Credit",
              },
            ].map((item, index) => {
              const isTop = item.id == 1;
              const isBottom = item.id == 4;

              return (
                <>
                  <div
                    key={index}
                    style={{
                      borderTopLeftRadius: isTop ? 15 : 2,
                      borderTopRightRadius: isTop ? 15 : 2,
                      borderBottomLeftRadius: isBottom ? 20 : 2,
                      borderBottomRightRadius: isBottom ? 20 : 2,
                    }}
                    className="tbox"
                  >
                    <div className="status">{item.status}</div>
                    <div className="alert">{item.type}</div>
                    <div className="amount">{item.amount}</div>
                    <div className="tId">{item.tId}</div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="notes">
            
            <b style={{}}>BitBanker</b>, here every customer is verified and
            user data are protected by the C-SKv architecture, guaran teeing
            <b style={{}}> 24/7</b> security of funds.{"\n"} Transactions are
            done by logged in users promptings.
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
