import "./picupload.css";
import{db} from "./firebase.ts"
import{doc,setDoc} from "firebase/firestore";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SyncLoader} from "react-spinners";

export default function UploadPic(){
const navigate = useNavigate();



const [selected,setSelected]=useState<File | null>(null);
const[click,setClick]=useState("")

const[imgUrl,setImgUrl]=useState("");
const[notice,setNotice]=useState("");
const[uploading,setUploading]=useState(false);
const[uploaded,setUploaded]=useState(false);

const handleNav = ()=>{if(uploaded){
navigate("/")}}




const handleFileSelect =(e:React.ChangeEvent<HTMLInputElement>)=>{
const file = e.target.files?.[0];
if(file){setSelected(file);
setClick('You selected a picture. Click "Upload"')}}

const handleUpload = async()=>{
if(!selected){setNotice("Please select photo to proceed");
return;}

if(!uploaded){

setUploading(true);
setNotice("");

const myFormData = new FormData();
myFormData.append('file', selected);
myFormData.append("upload_preset","bitbankers_upload");

await axios.post("https://api.cloudinary.com/v1_1/dadvxxgl1/upload",myFormData).then(async (response)=>{console.log("Picture uplodeded to cloudiary @bibakers_uploads");
setClick("");
setImgUrl(response.data.secure_url);
localStorage.setItem("picURL",response.data.secure_url);
await setDoc(doc(db,"bitbankers",response.data.secure_url),{
uploaded_pic:response.data.secure_url});
setNotice("✅ Uploaded successfully, you can continue");})

.catch((error:any)=>{setNotice(error.message.includes("Invalid")?"Success" : "Upload failed")})
.finally(()=>setUploading(false));
setUploaded(true)}}
return(
	<div className="outerContainer">
<div className="uploadArea">
<div className="upText">Let's get your clear shot</div>

{notice &&<div  style={{color:"#00f0a9"}}                               className='noticeCover'>                                              <div className="notice">{notice}</div></div>}

<div className='uploadBox'>

{imgUrl && <img style={{position:"absolute",height:"100%",width:"100%"}} src={imgUrl}/>}
<input className="fileArea" type="file" onChange={handleFileSelect} accept="images/*"/>


<div className="clickAndSpinner">{selected && !uploading && <div style={{color:selected?"#00f0a9":"black",fontWeight:"bold"}}>{click}</div>}

{uploading &&<SyncLoader size={20} color="#2e4a5f"/>}
</div>
{!selected && <img style={{position:"relative",height:"35%",width:"40%"}}src="https://i.postimg.cc/JhF95D7r/file-00000000d7b4622fa2f6dbb2df2fb180.png"/>}

</div>

<div style={{backgroundColor:uploaded?"#00f0a9":"black"}}className="uploadbtn" onClick={()=>{handleUpload();handleNav()}}>{uploaded? "Continue":"Upload" || uploading && "Uploading"}</div>
</div>
</div>)}
