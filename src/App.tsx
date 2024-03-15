import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Compressly from "./components/Compressly/Compressly";
import FAQs from "./components/FAQs/FAQs"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App: React.FC = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Compressly" element={<Compressly value={""} />} />
            <Route path="/FAQs" element={<FAQs />} />
        </Routes>
        </Router>
    );
}

export default App;