import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Customers from "./Customers/Customers";
import Orders from "./Orders/Orders";
import Settings from "./Settings/Settings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Customers} />
        <Route path="/home" Component={Home} />
        <Route path="/orders" Component={Orders} />
        <Route path="/settings" Component={Settings} />
      </Routes>
    </Router>
  );
}

export default App;
