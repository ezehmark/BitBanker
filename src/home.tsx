import { useState, useEffect, useRef, useCallback } from "react";
import "./home.css";
import "./sampleCoin.css";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { analytics } from "./firebase.ts";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  Filler,
);

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
  const [scrollOpacity4, setScrollOpacity4] = useState(0);

  const maxScroll1 = 30;
  const maxScroll2 = 90;
  const maxScroll3 = 400;

  const cryptoBoxRef = useRef(null);
  const boxTitleRef = useRef(null);

  useEffect(() => {
    
      cryptoBoxRef.current.classList.add("cryptoAnimClass");
      boxTitleRef.current.classList.add("boxTitleAnimClass")
    
  }, []);

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
  useEffect(() => {
    const maxiScroll = 300;
    const handleButtonScroll = () => {
      if (scrollOpacity3 < 1) {
        const scrollValue = window.scrollY;

        setScrollOpacity3(Math.min(1, scrollValue / maxiScroll));
      }
      if (scrollOpacity3 == 1) {
        login2Ref.current.classList.add("login2AnimClass");
      }
    };

    window.addEventListener("scroll", handleButtonScroll);
    return () => window.removeEventListener("scroll", handleButtonScroll);
  }, [scrollOpacity3]);


  const arrowRef=useRef(null);
  const loginRef = useRef(null);
const triggerLoginHover=(e)=>{
  if(loginRef.current && loginRef.current.contains(e.target as Node)){ arrowRef.current.classList.add(arrowAnim) }
}


  useEffect(()=>{
  document.addEventListener("pointerenter",triggerLoginHover);
	   return ()=>document.removeEventListener("pointerenter",triggerLoginHover);
  },[]);

  const coinLogoRef = useRef(null);

  const controlCoinLogo = (e)=>{

  if(coinLogoRef.current.contains(e.target as Node)){
  const cl = coinLogoRef.current;
  cl.classList.remove("coinLogoAnimClass");
  
  void cl.offsetWidth;

  cl.classList.add('coinLogoAnimClass')}
  }

  useEffect(()=>{
  document.addEventListener("pointerenter",controlCoinLogo);
  return ()=> document.removeEventListener("pointerenter",controlCoinLogo);},[]);


  const initParticles = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const boxes = container.querySelectorAll(".coinBox");

    const myObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("coinBoxAnimClass");
          } else {
            entry.target.classList.remove("coinBoxAnimClass");
          }
        });
      },
      { root: container, threshold: 1 },
    );

    boxes.forEach((box) => myObserver.observe(box));
    return () => myObserver.disconnect();
  }, []);

  const coinTitle = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll4 = 800;
      if (scrollOpacity4 < 1) {
        const scrollY = window.scrollY;
        setScrollOpacity4(Math.min(1, scrollY / maxScroll4));
      }
      if (!isMobile) {
        setTimeout(() => {
          coinTitle.current.classList.add("coinTitleAnim");
        }, 2000);
      }
      if (scrollOpacity4 === 1) {
        cryptoBoxRef.current.classList.add("coinTitleAnim");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOpacity4]);

  const particlesOption = {
    background: {
      color: "transparent", // or any background color
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 0 },
        repulse: { distance: 100, duration: 0.5 },
      },
    },
    particles: {
      color: { value: "#feb819" },
      links: {
        color: "#213547",
        distance: 100,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "top-left",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 40,
      },
      opacity: { value: 1 },
      shape: { type: "circle" }, // You can also use: "square", "polygon", "star", "image", etc.
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    const savedPicURL = localStorage.getItem("picURL");

    setName(storedName !== null ? storedName : "");
    setPicUrl(savedPicURL !== null ? savedPicURL : "");
  }, []);

  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [solPrice, setSolPrice] = useState<string | null>(null);
  const [dogePrice, setDogePrice] = useState<string | null>(null);

  const btcPriceRef = useRef<string | null>(null);
  const ethPriceRef = useRef<string | null>(null);
  const solPriceRef = useRef<string | null>(null);
  const dogePriceRef = useRef<string | null>(null);

  const [btcColor, setBtcColor] = useState("white");
  const [ethColor, setEthColor] = useState("white");
  const [solColor, setSolColor] = useState("white");
  const [dogeColor, setDogeColor] = useState("white");

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
              "publicTrade.DOGEUSDT",
              "publicTrade.XRPUSDT",
              "publicTrade.ADAUSDT",
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

          if (symbol == "DOGEUSDT") {
            const prev = dogePriceRef.current
              ? parseFloat(dogePriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (prev < currentP) {
              setDogeColor("#feb819");
            } else if (prev > currentP) {
              setDogeColor("#ec5300");
            } else {
              setDogeColor("grey");
            }

            dogePriceRef.current = price;
            setDogePrice(price);
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

  const [loading, setLoading] = useState(false);
  const [btcChartData, setBtcChartData] = useState(null);
  async function getBtcChart() {
    setLoading(true);
    console.warn("effect triggered!");

    try {
      const response = await axios.get(
	      "https://mybackend-oftz.onrender.com/coingecko/charts");
      console.log(response.data);
      const chartData = response.data;
      console.warn(chartData);
      const priceData = chartData.prices.map((p) => ({
        x: new Date(p[0]),
        y: p[1],
      }));

      setBtcChartData({
        datasets: [
          {
            data: priceData,
            backgroundColor: "red",
            borderWidth: 0.6,
            borderColor: "orange",
            fill: false,
            tension: 1,
            pointRadius: 0.1,
          },
        ],
      });
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBtcChart();
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: "true", text: "BTC price" },
      },
    },

    plugins: {
      title: { display: false, text: "7-Day Bitcoin price chart live" },
    },
  };

  const chartOptions2 = {
    responsive: false,
    maintainAspectRatio: false,

    scales: {
      x: {
        display: false,
        type: "time",
        time: { unit: "day" },
        title: { display: false, text: "Date" },
      },
      y: {
        display: false,
        title: { display: false, text: "BTC price" },
      },
    },
    plugins: {
      title: { display: false, text: "7-Day timeframe" },
      legend: { display: false },
    },
  };
  const coinData = [
    {
      coinLogo: "https://i.postimg.cc/qvS5hZ24/images.png",
      coinColor: btcColor,
      coinPrice: btcPrice,
      coinSymbol: "BTCUSDT",
      coinName: "Bitcoin",
      chartData: btcChartData,
    },
    {
      coinLogo: "https://i.postimg.cc/L58T0zjx/images-1.png",
      coinColor: ethColor,
      coinPrice: ethPrice,
      coinSymbol: "ETHUSDT",
      coinName: "Ethereum",
    },
    {
      coinLogo: "https://i.postimg.cc/B6G7NLhz/download.jpg",
      coinColor: solColor,
      coinPrice: solPrice,
      coinSymbol: "SOLUSDT",
      coinName: "Solana",
    },
    {
      coinLogo: "https://i.postimg.cc/Znb7zkzF/download-1.jpg",
      coinColor: dogeColor,
      coinPrice: dogePrice,
      coinSymbol: "DOGEUSDT",
      coinName: "Dogecoin",
    },
  ];

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
          height: 2500,
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
            options={particlesOption}
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
            <button className="menuItem1">Track Prices</button>
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
                flexDirection: isMobile?"column":"row",
                gap: 20,
              }}
            >


	    <div 
	    className='firstGroup'
	    style={{justifyContent:"space-between",display:"flex",
		    alignItems:"center",width:"100%",position:"relative",flexDirection:"column",gap:40}}>




              <div
                ref={cryptoBoxRef}
                className="cryptoBox"
                style={{ opacity: 1, padding: 0, color: "#213547" }}
              >
                <h2
                  className="cryptoH2"
		  ref={boxTitleRef}

                  style={{
                    margin: 0,
                    padding: 10,
                    borderRadius: 20,
                    textAlign: "center",
		    backgroundColor:"#00d4d4",
                  }}
                >
                  Crypto meets banking
                </h2>
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
            

            <div
	    ref={loginRef}
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
              <div className="login2">
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    position: "relative",
                    color: "black",
                    zIndex: 10,
                  }}
                >
                  Quick sign in
                  <img
		  ref={arrowRef}
                    className="arrowRight"
                    src="https://i.postimg.cc/hjwq2yr9/file-00000000df6061f9a2d97efda108b371.png"
                    style={{
                      position: "absolute",
                      height: 18,
                      bottom: -15,
                      right: 10,
                      width: 25,
                      opacity: 1,
                    }}
                  />
                </div>

                <button
                  onClick={() => navigate("/login")}
                  ref={login2Ref}
                  className="login2Button"
                >
                  Sign in
                </button>
              </div>
            </div>

	    </div>
	    </div>
	    





	    <div                                                                  className='secondGroup'                                                style={{justifyContent:"space-between",display:"flex",
		    alignItems:"center",width:isMobile?"100%":1000,
	    position:"relative",backgroundColor:"red",flexDirection:isMobile?"column":"row",gap:40}}>

            <div
              style={{
                justifyContent: "space-betweeen",
                display: "flex",
                flexDirection: "column",
                gap: 40,
                alignItems: "center",
                
              }}
            >

	    






              <h2 ref={coinTitle} style={{color:"#213547"}}>
                Trade best coins,<b style={{color:"#feb819"}}> anytime
              </b></h2>

              <div ref={containerRef} 
	      style={{position:"relative",width:isMobile?window.innerWidth:500}}
	      className="sampleContainer">
                {coinData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => getBtcChart()}
                      className="coinBox"
                    >
                      <div 
		      ref={coinLogoRef}
		      className="coinLogo">
                        <img
                          className="logoImg"
                          src={item.coinLogo}
                          style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                          }}
                        />
                      </div>

                      <div
                        style={{ color: item.coinColor }}
                        className="coinPrice"
                      >
                        {item.coinPrice == null
                          ? "Loading"
                          : Number(item.coinPrice).toLocaleString("en-us")}
                      </div>

                      <div
                        style={{
                          height: 150,
                          position: "absolute",
                          left: 2,
                          top: 70,
                          zIndex: 20,
                          width: "100%",
                          backgroundColor: "transparent",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {btcChartData ? (
                          <Line
                            options={chartOptions2}
                            width={198}
                            height={100}
                            data={btcChartData}
                          />
                        ) : (
                          <Skeleton height={100} width={150} />
                        )}
                      </div>

                      <div className="coinSymbol">{item.coinSymbol}</div>
                      <div className="coinName">{item.coinName}</div>
                    </div>
                  );
                })}
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
