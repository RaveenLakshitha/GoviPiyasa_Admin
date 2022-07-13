import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoutes";
import About from "./Pages/About";
import Architect from "./Pages/Architect";
import Dashboard from "./Pages/Dashboard";
import Delivery from "./Pages/Delivery";
import Expert from "./Pages/Expert";
import Forum from "./Pages/Forum";
import Home from "./Pages/Home";
import Items from "./Pages/Items";
import Login from "./Pages/Login";
import Orders from "./Pages/Orders";
import Setting from "./Pages/Setting";
import Shop from "./Pages/Shop";
import Advertisement from "./Pages/Advertisement";
import User from "./Pages/User";
import Register from "./Pages/Register";
import Information from "./Pages/Information";
import Notification from "./Pages/Notification";
//import Layout from "./Components/Layout"



function App() {

  const [loginPass, setLoginPass] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("user_token");
    if (token) {
      console.log(token);
      if (token) {
        setLoginPass(true);
      } else {
        setLoginPass(false);
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route exact path="/" element={<ProtectedRoute Component={Home} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shop" element={<ProtectedRoute Component={Shop} />} />
            <Route path="/user" element={<ProtectedRoute Component={User} />} />
            <Route path="/expert" element={<ProtectedRoute Component={Expert} />} />
            <Route path="/items" element={<ProtectedRoute Component={Items} />} />
            <Route path="/orders" element={<ProtectedRoute Component={Orders} />} />
            <Route path="/architect" element={<ProtectedRoute Component={Architect} />} />
            <Route path="/forum" element={<ProtectedRoute Component={Forum} />} />
            <Route path="/delivery" element={<ProtectedRoute Component={Delivery} />} />
            <Route path="/information" element={<ProtectedRoute Component={Information} />} />
            <Route path="/registerNewAdmin" element={<ProtectedRoute Component={Register} />} />
            <Route path="/advertisement" element={<ProtectedRoute Component={Advertisement} />} />
            <Route path="/notification" element={<ProtectedRoute Component={Notification} />} />
          </Route>

          <Route path="/home" element={<ProtectedRoute Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
