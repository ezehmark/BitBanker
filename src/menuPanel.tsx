import {useState,useEffect,useRef} from "react";
import "./menu.css";
import {useNavigate} from "react-router-dom";









export default function Menu({day,toggleDay,setOpenMenu}:{day:boolean,toggleDay:()=>void,setOpenMenu:()=>void}){

const navigate = useNavigate();

const itemsHolderRef = useRef<HTMLDivElement>(null);

const closeMenu =(e)=>{
if(itemsHolderRef.current && ! itemsHolderRef.current.contains(e.target as Node)){
setOpenMenu(false);
console.log("menu closed x");
}}

useEffect(()=>{
document.addEventListener("pointerdown",closeMenu);

return ()=>document.removeEventListener("pointerdown",closeMenu);
},[setOpenMenu]);

const menuItems =[{name:"Markets"},{name:"Trading"},{name:"Fintech"},{name:"Settings",url:"Settings"},{name:"About us",url:"cschats"}];



return(<>

<div 
className="menuContainer">

<div ref={itemsHolderRef} 
className="menuItemsContainer"
style={{backgroundColor:!day?"#213547":"#f3f0e9"}}>
<div className="itemsHolder"
style={{color:day?"#213547":"#ccc"}}>
{menuItems.map((item,index)=>{
	return(
<button 
className="menuItem"
style={{marginTop:index == 3 && 100}}
onClick={()=>{setOpenMenu(false);navigate(`/${item.url}`)}}
>{item.name}</button>)})}
</div>
</div>
</div>

</>)}
