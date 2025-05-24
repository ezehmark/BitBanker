import {useState,useEffect,useRef} from "react";           import "./menu.css";







export default function Profile({setOpenProfile}:{setOpenProfile:()=>void}){

const[picUrl,setPicUrl]=useState("");

useEffect(()=>{
	const profilePic = localStorage.getIem("picURL");
setpicUrl(profilePic)},[]);

const itemsHolderRef = useRef<HTMLDivElement>(null);

const closeProfile =(e)=>{
if(itemsHolderRef.current && ! itemsHolderRef.current.contains(e.target as Node)){
setOpenProfile(false);                                        console.log("profile closed x");
}}

useEffect(()=>{
document.addEventListener("pointerdown",closeProfile);
                                                           return ()=>document.removeEventListener("pointerdown",closeProfile)
},[setOpenProfile]);



return(<>

<div className="profileContainer">

<div ref={itemsHolderRef} className="profileItemsContainer">
<div className="itemsHolder">
<div className="profilePic"><img src={picUrl} className="profileImg"/></div>
<div className="profileItem">Markets</div>
<div className="profileItem">About us</div>
<div className="profileItem">Banking</div>
</div>
</div>
</div>

</>)}
