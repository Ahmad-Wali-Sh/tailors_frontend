import React, { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [activeNav, setActiveNav] = useState("");

  return (
    <nav className="navbar flex justify-between items-center">
      <Link to={"/home"} onClick={() => setActiveNav("home")}>
        <div className="text-xl font-bold p-4">
          <img className='logo' src='/Logo.PNG' alt='دوخت پرو'/>
        </div>
      </Link>
      <div className="flex p-1">
        <Link to="/settings" onClick={() => setActiveNav("settings")}>
          <div className={`nav-item ${activeNav == "settings" && "active-nav"}`}>
            تنظیمات
          </div>
        </Link>
        <Link to="/orders" onClick={() => setActiveNav("orders")}>
          <div
            className={`nav-item ${activeNav == "orders" && "active-nav"}`}
          >
            سفارشات
          </div>
        </Link>
        <Link to="/" onClick={() => {setActiveNav("")}}>
          <div
            className={`nav-item rounded-r-full ${
              activeNav == "" && "active-nav"
            }`}
          >
            مشتریان
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
