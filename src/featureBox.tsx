import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import "./featureBox.css";
export default function FeatureBox({ day }) {
  //First circle

  const angle1 = useMotionValue(0);
  const radius1 = 130;
  const c1x = useTransform(angle1, (a) => 130 + radius1 * Math.cos(a) - 50);
  const c1y = useTransform(angle1, (a) => 130 + radius1 * Math.sin(a) - 50);
  const c1Ref = useRef(null);

  useAnimationFrame((t) => {
    
      angle1.set((t / 20000) * 2);

  });

  //Circle1b

  const angle1b = useMotionValue(Math.PI);
  const radius1b = 130;
  const c1xb = useTransform(angle1b, (a) => 130 + radius1b * Math.cos(a) - 50);
  const c1yb = useTransform(angle1b, (a) => 130 + radius1b * Math.sin(a) - 50);
  const c1bRef = useRef(null);
  useAnimationFrame((t) =>{

      angle1b.set((t / 20000) * 2 + Math.PI);

  });

  //Circle 2  details

  const angle2 = useMotionValue(Math.PI/3);
  const radius2 = 80;
  const c2x = useTransform(angle2, (a) => 80 + radius2 * Math.cos(a) - 20);
  const c2y = useTransform(angle2, (a) => 80 + radius2 * Math.sin(a) - 20);
  useAnimationFrame((t) => {
    
      angle2.set(((t / 8000) * 2)+Math.PI/3);

  });

  //circle 2b
  //
  const c2Ref=useRef(null);
  const c2bRef = useRef(null);

  const angle2b = useMotionValue(Math.PI*1.5);

  const radius2b = 80;
  const c2xb = useTransform(angle2b, (a) => 80 + radius2b * Math.cos(a) - 20);
  const c2yb = useTransform(angle2b, (a) => 80 + radius2b * Math.sin(a) - 20);
  useAnimationFrame((t) => {

      angle2b.set((t / 8000) * 2 + Math.PI*1.5);
    
  });

  const [feature, setFeature] = useState("");

  const [flashFeature,setFlasFeature] = useState(false);


  const featureRef = useRef(null);

  const features = ["Fast transactions","Efficient system", "High security","Hybrid technology"];

  useEffect(()=>{



//flashing each motion circle and
//selecting each feature from features array

  let fIndex = 0;
  let selectInterval;


const runCycle=()=>{

if(selectInterval){clearInterval(selectInterval)};
selectInterval = setInterval(()=>{


setFeature("");

//use setTimout to flash the feature updates

setTimeout(()=>{

setFeature(features[fIndex]);

  fIndex = (fIndex +1 ) % features.length
          },500);

	  },5000);

//remove all claslists first to ensire reanimation
//


c1Ref.current.classList.remove(day?"featureAnimClass":"featureAnimNight");
c1bRef.current.classList.remove(day?"featureAnimClass":"featureAnimNight");

c2Ref.current.classList.remove(day?"featureAnimClass":"featureAnimNight");



c2bRef.current.classList.remove(day?"featureAnimClass":"featureAnimNight");

//Then add the timeouts separately:


setTimeout(()=>{
c1Ref.current.classList.add(day?"featureAnimClass":"featureAnimNight");},5000);

setTimeout(()=>{
c1bRef.current.classList.add(day?"featureAnimClass":"featureAnimNight");},11000);

setTimeout(()=>{
c2Ref.current.classList.add(day?"featureAnimClass":"featureAnimNight");},16000);

setTimeout(()=>{
c2bRef.current.classList.add(day?"featureAnimClass":"featureAnimNight");},21000);
}


runCycle();

let cycleInterval = setInterval(runCycle,24000);


  return ()=>{clearInterval(cycleInterval);clearInterval(selectInterval)}


  


  },[]);





  return (
    <div
      className="featureBox"
      style={{ backgroundColor: "transparent", width: window.innerWidth }}
    >
      <div
        className="circle1"
        style={{
          position: "relative",
          height: 260,
          width: 260,
          border: "0px solid rgba(0,0,0,0.2)",
          borderRadius: "50%",
          backgroundColor: "transparent",
        }}
      >
        <motion.div
	ref={c1Ref}
          onClick={() => {
            setFeature("Fast transactions");setTimeout(()=>{setFeature("")},4000);
          }}
          style={{
            x: c1x,
            y: c1y,
            height: 80,
            width: 80,
            display: "flex",
            borderRadius: "50%",
            backgroundColor: "rgba(239,152,0,0.4)",
            position: "absolute",
          }}
        >
          <img
            src="https://i.postimg.cc/85LH9mhX/file-000000001ee46246ad2d850c2d5649db.png"
            style={{ position: "absolute", height: "125%", width: "125%" }}
          />
        </motion.div>

        <motion.div
	ref={c1bRef}
	onClick={() => {                                                                          setFeature("Efficient system");setTimeout(()=>{setFeature("")},4000);
          }}
          style={{
            x: c1xb,
            y: c1yb,
            height: 80,
            width: 80,
            display: "flex",
            borderRadius: "50%",
            position: "absolute",
            backgroundColor: "rgba(239,152,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://i.postimg.cc/K8CzFQBL/file-00000000581c61f484d298549395f5ff.png"
            style={{ position: "absolute", height: "125%", width: "125%" }}
          />
        </motion.div>
        <div
          className="circle2"
          style={{
            position: "absolute",
            height: 160,
            width: 160,
            alignSelf: "center",
            border: "0px solid red",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            top: "50%",
            left: "50%",
            zIndex: 60,
	    overfluow:"hidden",
	    display:"flex",
	    backgroundColor:"black",
	    boxShadow:"2px 2px 4px rgba(0,0,0,0.3)",
	    backgroundImage:'url("https://i.postimg.cc/xCZVLKTJ/file-000000007fe06246945a42ff767b69c2-1.png")',
	    backgroundSize:"cover"
	  }}>
            <div
	    style={{
              position: "absolute",
              transform: "translate(-50%,-50%)",
              top: "45%",
              left: "50%",
              fontSize: 16,
              fontWeight: "bold",
              color: day ? "#213447" : "rgba(0,212,212,0.2)",
            }}
          >
            BitBanker
          </div>
	  {feature && <div 
		  ref={featureRef} className="feature" style={{  }}>
            {feature}
          </div>}
          <motion.div
	  ref={c2Ref}
	  onClick={() => {                                                                          setFeature("High security");setTimeout(()=>{setFeature("")},4000);
          }}
            style={{
              x: c2x,
              y: c2y,
              height: 60,
              width: 60,
              borderRadius: "50%",
              position: "absolute",
              backgroundColor: "rgba(239,152,0,0.4)",
	      zIndex:45
            }}
          >
            <img
              src="https://i.postimg.cc/Gh53JzMN/file-000000003c00624690d3a7bbc870baf4.png"
              style={{ position: "absolute", height: "125%", width: "125%" }}
            />
          </motion.div>

          <motion.div
	  ref={c2bRef}
	  onClick={() => {                                                                          setFeature("Hybrid technology");setTimeout(()=>{setFeature("")},4000);
          }}
            style={{
              x: c2xb,
              y: c2yb,
              height: 60,
              width: 60,
              zIndex: 58,
              borderRadius: "50%",
              position: "absolute",
              backgroundColor: "rgba(239,152,0,0.4)",
            }}
          >
            
            <img
              src=" https://i.postimg.cc/6qHx4vMc/file-000000001d9c6246be034652f5242108.png"
              style={{ position: "absolute", height: "125%", width: "125%" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
