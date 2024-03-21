import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MyURLs from "./components/MyURLs/MyURLs";
import FAQs from "./components/FAQs/FAQs";
import Features from "./components/Features/Features";
import Pricing from "./components/Pricing/Pricing";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/MyURLs" element={<MyURLs/>} />
                    <Route path="/FAQs" element={<FAQs />} />
                    <Route path="/Features" element={<Features />} />
                    <Route path="/Pricing" element={<Pricing />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;