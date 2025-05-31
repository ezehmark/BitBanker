import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import "./featureBox.css";
export default function FeatureBox() {
  //First circle

  const angle1 = useMotionValue(0);
  const radius1 = 130;
  const c1x = useTransform(angle1, (a) => 130 + radius1 * Math.cos(a) - 50);
  const c1y = useTransform(angle1, (a) => 130 + radius1 * Math.sin(a) - 50);
  const c1Ref = useRef(null);

  useAnimationFrame((t) => {
    setTimeout(() => {
      angle1.set((t / 10000) * 2);
    }, 2000);
  });

  //Circle1b

  const angle1b = useMotionValue(Math.PI);
  const radius1b = 130;
  const c1xb = useTransform(angle1b, (a) => 130 + radius1b * Math.cos(a) - 50);
  const c1yb = useTransform(angle1b, (a) => 130 + radius1b * Math.sin(a) - 50);
  const c1Refb = useRef(null);
  useAnimationFrame((t) => {
    setTimeout(() => {
      angle1b.set(((t / 12000) * 2)+Math.PI);
    }, 1000);
  });

  //Circle 2  details

  const angle2 = useMotionValue(0);
  const radius2 = 80;
  const c2x = useTransform(angle2, (a) => 80 + radius2 * Math.cos(a) - 20);
  const c2y = useTransform(angle2, (a) => 80 + radius2 * Math.sin(a) - 20);
  const c2Ref = useRef(null);
  useAnimationFrame((t) => {
    setTimeout(() => {
      angle2.set((t / 4000) * 2);
    }, 8000);
  });

  //circle 2b

const angle2b = useMotionValue(0);
  const radius2b = 80;                                                   const c2xb = useTransform(angle2b, (a) => 80 + radius2b * Math.cos(a) - 20);                                                                   const c2yb = useTransform(angle2b, (a) => 80 + radius2b * Math.sin(a) - 20);                                                                   const c2Refb = useRef(null);                                           useAnimationFrame((t) => {                                              setTimeout(() => {                                                      angle2b.set((t / 4000) * 2);                                         }, 8000);                                                           });

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
          border: "0.5px solid rgba(0,0,0,0.2)",
          borderRadius: "50%",
          backgroundColor: "transparent",
        }}
      >
        <motion.div
          ref={c1Ref}
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
        ><img                                                                    src="https://i.postimg.cc/85LH9mhX/file-000000001ee46246ad2d850c2d5649db.png"                                                               style={{ position: "absolute", height: "125%", width: "125%" }}                                                                           />                                                                  </motion.div>

        <motion.div
          ref={c1Refb}
          style={{
            x: c1xb,
            y: c1yb,
            height: 80,
            width: 80,
            display: "flex",
            borderRadius: "50%",
            position: "absolute",
	    backgroundColor: "rgba(239,152,0,0.4)",
            display: "flex",
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
            backgroundColor: "transparent",
          }}
        >
          <h1
            style={{
              position: "absolute",
              transform: "translate(-50%,-50%)",
              top: "50%",
              left: "50%",
            }}
          >
            Blocavax
          </h1>
          <motion.div
            ref={c2Ref}
            style={{
              x: c2x,
              y: c2y,
              height: 60,
              width: 60,
              borderRadius: "50%",
              position: "absolute",
	      backgroundColor: "rgba(239,152,0,0.4)",
            }}
          >
            <img
              src="https://i.postimg.cc/Gh53JzMN/file-000000003c00624690d3a7bbc870baf4.png"
              style={{ position: "absolute", height: "125%", width: "125%" }}
            />
          </motion.div>

	  <motion.div                                                             ref={c2Refb}                                                           style={{                                                                x: c2xb,
              y: c2yb,                                                               height: 60,                                                           width: 60,                                                            borderRadius: "50%",                                                  position: "absolute",                                                 backgroundColor: "rgba(239,152,0,0.4)",                             }}                                                                  >                                                                       <img                                                                    src="https://i.postimg.cc/Gh53JzMN/file-000000003c00624690d3a7bbc870baf4.png"                                                               style={{ position: "absolute", height: "125%", width: "125%" }}                                                                           />                                                                  </motion.div>

        </div>
      </div>
    </div>
  );
}
