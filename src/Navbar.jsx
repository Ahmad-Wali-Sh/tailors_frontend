import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [activeNav, setActiveNav] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key combination matches the desired shortcut
      if (
        (event.key === "F1")
      ) {
        setActiveNav("");
        navigate("/");
      }
      if (event.key == "F2") {
        event.preventDefault();
        setActiveNav("orders");
        navigate("/orders");
      }
      if (event.key == "F3") {
        event.preventDefault();
        setActiveNav("customer-list");
        navigate("/customer-list");
      }
      if (event.key == "F4") {
        event.preventDefault();
        setActiveNav("settings");
        navigate("/settings");
      }
    };

    // Add event listener for keydown event
    window.addEventListener("keydown", handleKeyDown);

    // Clean up by removing the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="navbar flex justify-between items-center" tabIndex={-1}>
      <Link to={"/home"} onClick={() => setActiveNav("home")} tabIndex={-1}>
        <div className="text-xl font-bold p-4" tabIndex={-1}>
          <img className="logo" src="/Logo.PNG" alt="دوخت پرو" />
        </div>
      </Link>
      <div className="flex p-1">
        <Link to="/settings" onClick={() => setActiveNav("settings")} tabIndex={-1}>
          <div
            className={`nav-item ${activeNav == "settings" && "active-nav"}`}
            tabIndex={-1}
          >
            تنظیمات
          </div>
        </Link>
        <Link to="/finance" onClick={() => setActiveNav("finance")} tabIndex={-1}>
          <div
            className={`nav-item ${activeNav == "finance" && "active-nav"}`}
            tabIndex={-1}
          >
            حسابداری
          </div>
        </Link>
        <Link tabIndex={-1}
          to="/customer-list"
          onClick={() => {
            setActiveNav("customer-list");
          }}
        >
          <div
          tabIndex={-1}
            className={`nav-item ${
              activeNav == "customer-list" && "active-nav"
            }`}
          >
            مشتریان
          </div>
        </Link>
        <Link tabIndex={-1} to="/orders" onClick={() => setActiveNav("orders")}>
          <div className={`nav-item ${activeNav == "orders" && "active-nav"}`} tabIndex={-1}>
            سفارشات
          </div>
        </Link>
        <Link tabIndex={-1}
          to="/"
          onClick={() => {
            setActiveNav("");
          }}
        >
          <div
          tabIndex={-1}
            className={`nav-item rounded-r-full ${
              activeNav == "" && "active-nav"
            }`}
          >
            ثبت مشتری
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
