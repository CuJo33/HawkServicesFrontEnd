import React, { useState, useEffect } from "react";
import Logo from "../assets/hawk.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const history = useHistory();
  const logout = () => {
    history.push("/login");
    props.logout();
    // changeToken(undefined);
  };
  return (
    <div className="nav-container">
      <div className="left-side">
        <img src={Logo} alt="" />
      </div>
      <div className="right-side">
        {(toggleMenu || screenWidth > 500) && (
          <ul className="list">
            <Link to="/"> Home </Link>
            <Link to="/services"> Services </Link>
            <Link to="/about"> About </Link>
            <Link to="/contact"> Contact </Link>
            <Link to="/quotes"> Quotes </Link>
            <Link to="/booking"> Booking </Link>
            <Link to="/dashboard"> Dashboard </Link>
          </ul>
        )}

        {/* <button onClick={toggleNav} className="btn">
          <ReorderIcon
            style={{
              color: "white",
              width: "50px",
              height: "50px",
              outline: "none",
            }}
          />
        </button> */}
      </div>
      {props.token ? (
        <button
          style={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "7px",
          }}
          onClick={() => logout()}
        >
          Logout
        </button>
      ) : (
        <div> </div>
      )}
      {/* <div className="login">
        <ul className="list-login">
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Signup </Link>
        </ul>
      </div> */}
    </div>
  );
}

export default Navbar;

/* <div className="right-side">
               <Link style={{ color: 'inherit', textDecoration: 'inherit'}} className="login button" to="/login">Login</Link>
               <Link style={{ color: 'inherit', textDecoration: 'inherit'}} className="signup button" to="/signup">SignUp</Link>
            </div> */
// const [toggleMenu, setToggleMenu] = useState(false);
// const [screenWidth, setScreenWidth] = useState(window.innerWidth);

// const toggleNav = () => {
//   setToggleMenu(!toggleMenu);
// };

// useEffect(() => {
//   const changeWidth = () => {
//     setScreenWidth(window.innerWidth);
//   };

//   window.addEventListener("resize", changeWidth);

//   return () => {
//     window.removeEventListener("resize", changeWidth);
//   };
// }, []);

// return (
//   <nav>
//     {(toggleMenu || screenWidth > 500) && (
//       <ul className="list">
//         <li className="items">Home</li>
//         <li className="items">Services</li>
//         <li className="items">Contact</li>
//       </ul>
//     )}
