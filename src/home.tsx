import { useState, useEffect, useRef, useCallback } from "react";
import "./home.css";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { analytics } from "./firebase.ts";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

function Home({
  toggleProfile,
  toggleMenu,
}: {
  toggleMenu: () => void;
  toggleProfile: () => void;
}) {
  const [darkTheme, setDarkTheme] = useState(false);
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const [scrollOpacity1, setScrollOpacity1] = useState(0);
  const [scrollOpacity2, setScrollOpacity2] = useState(0);
  const [scrollOpacity3, setScrollOpacity3] = useState(0);

  const maxScroll1 = 30;
  const maxScroll2 = 90;
  const maxScroll3 = 400;

  const cryptoBoxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollOpacity1 < 1) {
        const scrollY = window.scrollY;

        setScrollOpacity1(Math.min(1, scrollY / maxScroll1));
      }
      if(!isMobile){
      setTimeout(()=>{
      cryptoBoxRef.current.classList.add("cryptoAnimClass");},2000)}
      if (scrollOpacity1 === 1) {
        cryptoBoxRef.current.classList.add("cryptoAnimClass");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOpacity1]);

  const boxText = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollOpacity2 < 1) {
        const scrollY = window.scrollY;
        setScrollOpacity2(Math.min(1, scrollY / maxScroll2));
      }
      if (scrollOpacity2 === 1) {
        boxText.current.classList.add("boxTextAnim");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOpacity2]);

  const [scrollVisible, setScrollVisible] = useState(0);
  const [boxVisibility, setBoxVisibility] = useState("hidden");

  const tickerBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxScroll = 350;

    function handleScroll() {
      if (tickerBoxRef.current && scrollVisible < 1) {
        const scrollValue = window.scrollY;
        const newScroll = Math.min(1, scrollValue / maxScroll);
        setScrollVisible(newScroll);
      }

      if (scrollVisible == 1) {
        tickerBoxRef.current.classList.add("boxAnimClass");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollVisible]);
  useEffect(() => {
    const handleScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);


const login2Ref = useRef(null);
  useEffect(()=>{
const maxiScroll = 300;
const handleButtonScroll = ()=>{
if(scrollOpacity3 < 1){

const scrollValue = window.scrollY;

setScrollOpacity3(Math.min(1,scrollValue/maxiScroll))}
if(scrollOpacity3 ==1){
login2Ref.current.classList.add("login2AnimClass")}
 
}

window.addEventListener("scroll",handleButtonScroll);
return()=>window.removeEventListener("scroll",handleButtonScroll);
  },[scrollOpacity3]);

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
              setBtcColor("grey");
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
              setEthColor("grey");
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
              setSolColor("grey");
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
      <div
        className="tsParticles"
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100vw",
          backgroundImage:
            'url("https://i.postimg.cc/L6fhJ6Dy/file-000000005f2c62468e48d3172131c61a-2.jpg")',
          backgroundSize: "cover",
          height: 1700,
        }}
      >
        <div
          style={{
            height: 500,
            overflow: "hidden",
            display: "flex",
            width: "100%",
            position: "absolute",
          }}
        >
          
          <Particles
            id="tsparticles"
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
                size: { value: isMobile ? 1 : 2 },
                color: { value: "#131314" },
                links: {
                  enable: true,
                  distance: 100,
                  color: "#d50204",
                  opacity: 0.5,
                  width: isMobile ? 0.6 : 1,
                },
                move: { enable: true, speed: 0.5 },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
                modes: { repulse: { distance: 80 } },
              },
            }}
          />
        </div>
      </div>
      {isMobile ? (
        <div className="topHeading" style={{}}>
          <button
            className="menu"
            onClick={() => {
              toggleMenu();
              console.warn("menu toggled");
            }}
          >
            <img
              src={
                darkTheme
                  ? "https://i.postimg.cc/B65wgYfV/images-41.jpg"
                  : "https://i.postimg.cc/3xCFDfww/Picsart-25-05-04-05-37-21-849.png"
              }
              style={{ position: "absolute", height: "100%", width: "100%" }}
            />
          </button>

          <div className="title" style={{ left: isMobile ? "50%" : 100 }}>
            Blocavax
          </div>

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="signInButton"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div
          className="topHeading"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div className="title" style={{ left: isMobile ? "50%" : 100 }}>
            Blocavax
          </div>

          <div
            className="menuList"
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: 40,
            }}
          >
            <button className="menuItem1">Verification</button>
            <button className="menuItem1">Markets</button>
            <button className="menuItem1">About us</button>
            <button className="menuItem1">Banking</button>
          </div>

          <div
            onClick={() => {
              navigate("/login");
            }}
            className="signInButton"
          >
            Sign in
          </div>
        </div>
      )}
      <div
        className="container"
        style={{
          backgroundColor: "transparent",
          zIndex: 22,
        }}
      >
        <div
          className="outer"
          style={{ flexDirection: isMobile ? "column" : "column" }}
        >
          <h1
            className="heading1"
            style={{
              color: "#213547",
              textAlign: isMobile ? "center" : "center",
            }}
          >
            Enjoy the benefits of a hybrid economy
          </h1>

          <div style={{}} className="outerMiddle">
            <div
              className="boxAndText"
              style={{
                padding: 20,
                justifyContent: "space-between",
                display: "flex",
                width: "95%",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                ref={cryptoBoxRef}
                className="cryptoBox"
                style={{ opacity: 1, padding: 0, color: "#213547" }}
              >
                <h2 
		className="cryptoH2" style={{backgroundColor:scrollOpacity1 == 1&&"#00d4d4",margin:0,padding:10,borderRadius:20,textAlign: "center" }}>Crypto meets banking</h2>
              </div>

              <div
                ref={boxText}
                className="boxText"
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  backgroundColor: "transparent",
                  color: "#213547",
                }}
              >
                The speed of blockchain transactions and the ultimate safety of
                banking, all built together to empower you with the ease and
                confidence of trading your favourite cryptocurrencies anywhere,
                anytime from <b>Blocavax</b>. Ready to explore and trade?
              </div>
            </div>

            <div
              style={{
                height: 80,
                width: "90%",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
            >
              <div 
	      className="login2">
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    position: "relative",
		    color:"black",
		    zIndex:10
                  }}
                >
                  Quick sign in
                  <img
		  className="arrowRight"
                    src="https://i.postimg.cc/hjwq2yr9/file-00000000df6061f9a2d97efda108b371.png"
                    style={{
                      position: "absolute",
                      height: 18,
                      bottom: -15,
                      right: 10,
                      width: 25,
		      opacity:1
                    }}
                  />
                </div>

                <button onClick={()=>navigate("/login")}ref={login2Ref} className="login2Button">Sign in </button>
              </div>
            </div>

            <div style={{}} ref={tickerBoxRef} className="live-tickers">
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
                The prices above reflect real-time cryptocurrency prices.
                Tickers are tracked live.
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
      </div>
    </>
  );
}

export default Home;
