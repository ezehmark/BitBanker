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
<button className="menuItem">Reigster</button>
<button className="menuItem">Markets</button>
<button className="menuItem">Banking</button>
<button style={{marginTop:40}}className="menuItem">About us</button>
<button className="menuItem">Settings</button>
</div>
</div>
</div>

</>)}
