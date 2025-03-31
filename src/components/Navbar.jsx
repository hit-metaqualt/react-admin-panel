import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";
import { toast } from "react-toastify";  // Import Toast
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toast
import logo from "../assets/images/logo-img.png";
// import logo from "../assets/images/logo.png.png";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await dispatch(logoutUser());
        if (res) {
             toast.success("Logout successfully!", { autoClose: 2000, position: "top-center"  });
        } else {
            toast.error("Logout failed!");  // Error Toast for Logout failure
        }
        navigate("/login"); 
    };

    return (

        <header>
            <div className="wrapper">
                <div className="navbar-menu">
                <div className="menu">
              <Link to="/">
                <img src={logo} alt="" className="logo-img" />
              </Link>

              <ul>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Services</Link></li>
              </ul>
              </div>

              <div className="right-btn">
              <Link as={Link} to="/profile"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" alt="" /></Link>
                
                <Link to="" onClick={handleLogout}>Log out</Link>
              </div>
              </div>
              
              </div>
        </header>
        // <div className="top-navbar d-flex justify-content-between align-content-center">
        //     <div>
        //         <img src="/logo.png" className="logo-img" alt="logo" />
        //     </div>
        //     <div className="d-flex align-items-center">
        //         <div className="me-5 text-white" onClick={() => navigate("/dashboard")}>
        //             Home
        //         </div>
        //         <div className="me-5 text-white"> Service</div>
        //         <Dropdown>
        //             <Dropdown.Toggle
        //                 as="img"
        //                 src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
        //                 className="rounded-circle"
        //                 height="40"
        //                 alt="Profile"
        //                 id="dropdown-profile"
        //             />

        //             <Dropdown.Menu align="end">
        //                 <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        //                 <Dropdown.Divider />
        //                 <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        //             </Dropdown.Menu>
        //         </Dropdown>
        //     </div>
        // </div>
    );
};

export default NavBar;
