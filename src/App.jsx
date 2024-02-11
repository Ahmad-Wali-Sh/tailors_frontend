import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Customer from "./Customers/Customer";
import Orders from "./Orders/Orders";
import Settings from "./Settings/Settings";
import CustomerList from "./CustomerList/CustomerList";
import Finance from "./Finance/Finance";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Customer} />
        <Route path="/home" Component={Home} />
        <Route path="/orders" Component={Orders} />
        <Route path="/customer-list" Component={CustomerList} />
        <Route path="/settings" Component={Settings} />
        <Route path="/finance" Component={Finance} />
      </Routes>
    </Router>
  );
}

export default App;
