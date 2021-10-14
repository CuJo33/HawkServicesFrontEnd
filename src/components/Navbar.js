import React, { useState, useEffect } from "react";
import Logo from "../assets/hawk.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";
import { useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

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
    <ReactBootStrap.Navbar
      fixed="top"
      className="navbar"
      collapseOnSelect
      expand="md"
    >
      <ReactBootStrap.Container>
        <ReactBootStrap.Navbar.Brand href="#home">
          {" "}
          <img class="logo" src={Logo} />
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="me-auto nav-list">
            <Link to="/"> Home </Link>
            <Link to="/services"> Services </Link>
            <Link to="/about"> About </Link>
            <Link to="/contact"> Contact </Link>
            {props.clientId ? "" : <Link to="/quotes"> Quotes </Link>}
            {/* {props.clientId ? <Link to="/booking"> Booking </Link> : ""} */}
            {props.employeeId ? (
              <Link to="/dashboardEmployee"> Employee-Dashboard </Link>
            ) : (
              ""
            )}
            {props.clientId ? <Link to="/dashboard"> Dashboard </Link> : ""}
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
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
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Container>
    </ReactBootStrap.Navbar>
  );
}

export default Navbar;

// {/* <div className="nav-container">
// <div className="left-side">
//   <img src={Logo} alt="" />
// </div>
// <div className="right-side">
//   {(toggleMenu || screenWidth > 500) && (
//     <ul className="list">
//       <Link to="/"> Home </Link>
//       <Link to="/services"> Services </Link>
//       <Link to="/about"> About </Link>
//       <Link to="/contact"> Contact </Link>
//       {props.clientId ? "" : <Link to="/quotes"> Quotes </Link>}
//       {/* {props.clientId ? <Link to="/booking"> Booking </Link> : ""} */}
//       {props.employeeId ? (
//         <Link to="/dashboardEmployee"> Employee-Dashboard </Link>
//       ) : (
//         ""
//       )}
//       {props.clientId ? <Link to="/dashboard"> Dashboard </Link> : ""}
//     </ul>
//   )}

//   {/* <button onClick={toggleNav} className="btn">
//     <ReorderIcon
//       style={{
//         color: "white",
//         width: "50px",
//         height: "50px",
//         outline: "none",
//       }}
//     />
//   </button> */}
// </div>
// {props.token ? (
//   <button
//     style={{
//       color: "white",
//       backgroundColor: "black",
//       borderRadius: "7px",
//     }}
//     onClick={() => logout()}
//   >
//     Logout
//   </button>
// ) : (
//   <div> </div>
// )}
// {/* <div className="login">
//   <ul className="list-login">
//     <Link to="/login"> Login </Link>
//     <Link to="/signup"> Signup </Link>
//   </ul>
// </div> */}
// </div> */}
