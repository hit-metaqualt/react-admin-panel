import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isActive = (path) => (location.pathname === path ? "active" : "");
    React.useEffect(() => {
        if (location.pathname === "/profile" || location.pathname === "/logout") {
            setIsDropdownOpen(true);
        }
    }, [location.pathname]);

    return (
        <div id="sidebar">
            <div class="sidebar-header">
                <h3><img src="logo.png" class="img-fluid" /></h3>
            </div>
            <ul class="list-unstyled component m-0">
                <li className={isActive("/")}>
                    <Link to="/dashboard" className="dashboard">
                        <i class="material-icons">dashboard</i>
                        Dashboard </Link>
                </li>
                <li className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
                    <a href="#" class="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <i class="material-icons">extension</i>Setting
                    </a>
                    <ul className={`list-unstyled menu ${isDropdownOpen ? "show" : "collapse"}`}>
                        <li className={isActive("/profile")}><Link to="/profile">Profile</Link></li>
                        <li><Link>Log Out</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};
export default SideBar;