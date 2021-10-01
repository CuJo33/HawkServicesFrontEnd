import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/team.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> HAWK SERVICES </h1>
        <p> READY TO HELP!</p>
        <Link to="/services">
          <button> LEARN MORE </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
