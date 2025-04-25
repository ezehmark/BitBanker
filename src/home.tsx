import { useState, useEffect, useRef } from "react";
import "./App.css";

function Home() {
  const topRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState("1300450");
  const [btc, setBtc] = useState("900000");
  const [eth, setEth] = useState("300000");
  const [sol, setSol] = useState("250000");


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
    login && <div className="container">
        <div className="title">Bank Web</div>
        <div className="outer">
          <div className="perspective">
            <div
              className="button2"
              ref={button2Ref}
              onClick={() => {
                handleAnim2();
              }}
            >
              See bank
            </div>
            <div className="top" ref={topRef}>
              <div className="button1" onClick={() => handleAnim1()}>
                See coins
              </div>
              <div className="crypto-face">
                <div className="total">
                  {Number(total).toLocaleString("en-us")} USD
                </div>
                <div className="wallet">Crypto wallet</div>
                <div className="coins-list">
                  <div
                    className="coin"
                    style={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <div className="logo">
                      <img src="https://i.postimg.cc/7L1GY17c/download-3.png" />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>12 </b>
                      BTC
                    </div>
                    <div className="price">
                      ~ {Number(btc).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
                    </div>
                  </div>

                  <div className="coin">
                    <div style={{ backgroundColor: "white" }} className="logo">
                      <img src="https://i.postimg.cc/PqqWcF0y/Ethereum-logo.png" />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>120 </b>
                      ETH
                    </div>
                    <div className="price">
                      ~ {Number(eth).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
                    </div>
                  </div>

                  <div
                    className="coin"
                    style={{
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <div className="logo">
                      <img
                        style={{ width: "110%", backgroundColor: "black" }}
                        src="https://i.postimg.cc/dV6R5KND/Solana-Logo.png"
                      />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>500 </b>
                      SOL
                    </div>
                    <div className="price">
                      ~ {Number(sol).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="balance">
                <div className="bal-txt">Balance</div>
                <div className="bal-amount">$ 1,245,600</div>
              </div>
              <div className="profile">
                <div className="dp">
                  <img
                    style={{
                      position: "absolute",
                      height: "110%",
                      width: "105%",
                    }}
                    src="https://i.postimg.cc/vH7TT4rX/1720950713065.jpg"
                  />
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    gap: 2,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="name">Onyekachi Banks</div>
                  <div className="verified">Verified ID</div>
                </div>
              </div>
            </div>
          </div>

          <div className="live-tickers">
            <div className="table-title">
              <div>Coins</div>


              <div style={{display:"flex",justifyContent:"space-between",gap:2,alignItems:"center",flexDirection:"row"}}>
	      <div>Price</div>
	      <div style={{borderRadius:2,alignItems:'center',padding:"2px 2px 2px 3px",border:"1px solid #5a3600",fontSize:10}}>  USDT<b style={{filter:"grayscale(30%)"}}>🔻</b></div>
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
            <b style={{}}>Bank Web</b>, here every customer is verified and user
            data are protected by the C-SKv architecture, guaranteeing
            <b style={{}}> 24/7</b> security of funds.{"\n"} Transactions are
            done by logged in users promptings.
          </div>
        </div>
      </div>
    
    </>
  );
}

export default Home;
