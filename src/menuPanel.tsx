import {useState,useEffect,useRef} from "react";
import "./menu.css";







export default function Menu({setOpenMenu}:{setOpenMenu:()=>void}){

const itemsHolderRef = useRef<HTMLDivElement>(null);

const closeMenu =(e)=>{
if(itemsHolderRef.current && ! itemsHolderRef.current.contains(e.target as Node)){
setOpenMenu(false);
console.log("menu closed x");
}}

useEffect(()=>{
document.addEventListener("pointerdown",closeMenu);

return ()=>document.removeEventListener("pointerdown",closeMenu)
},[setOpenMenu]);



return(<>

<div className="menuContainer">

<div ref={itemsHolderRef} className="menuItemsContainer">
<div className="itemsHolder">
<div className="menuItem">Verification</div>
<div className="menuItem">Markets</div>
<div className="menuItem">About us</div>
<div className="menuItem">Banking</div>
</div>
</div>
</div>

</>)}
