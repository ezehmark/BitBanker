import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home.jsx";
import SignUp from "./signup.jsx";
import UploadPic from "./picupload.tsx";
import Login from "./login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/picupload" element={<UploadPic />} />
	<Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
