import {useState,useEffect} from "react";

export default function textTyper({text,speed}:{text:string,speed:number}){

	const[typedText,setTypedText]=useState("");
	let index =0;

	useEffect(()=>{

	const typingInterval = setInterval(()=>{
		setTypedText((t)=>t + text.charAt(index));
	index+=1;

	if(index >= text.length){
        clearInterval(typingInterval)}


	},speed);


	return ()=>clearInterval(typingInterval);
	},[text,speed]);



	return<p>{typedText}</p>
}
