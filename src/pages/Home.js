import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/team.jpg";
import Footer from "../components/Footer";
import "../styles/Home.css";
import About from "./About";
import Services from "./Services";

function Home() {
  return (
    <>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> HAWK SERVICES </h1>
          <p> READY TO HELP!</p>
          <Link to="/services">
            <button> LEARN MORE </button>
          </Link>
        </div>
      </div>
      <div>
        <About />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
