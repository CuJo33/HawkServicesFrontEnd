import React from "react";
import Worker from "../assets/worker.jpg";
import "../styles/About.css";

export default function About() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${Worker})` }}
      ></div>
      <div className="rightSide">
        <h1> About Us</h1>
        <p>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa{" "}
        </p>
      </div>
    </div>
  );
}
