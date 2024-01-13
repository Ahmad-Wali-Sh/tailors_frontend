import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import New from "./New/New";
import Navbar from "./Navbar";
import Home from "./Home";
import Customers from "./Customers/Customers";
import Orders from "./Reports";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/new" Component={New} />
        <Route path="/customers" Component={Customers} />
        <Route path="/orders" Component={Orders} />
      </Routes>
    </Router>
  );
}

export default App;
