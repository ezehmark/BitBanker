import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./home.tsx";
import SignUp from "./signup.tsx";
import UploadPic from "./picupload.tsx";
import Login from "./login.tsx";

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
