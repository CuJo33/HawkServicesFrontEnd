import React from "react";
import "../styles/Services.css";
import Worker from "../assets/worker.jpg";
// import Light from "../assets/hawk-light.png";
import Security from "../assets/security.jpg";

function Services() {
  return (
    <>
      <div className="services">
        <div className="title">
          <h2>Our Services</h2>
        </div>
        <div className="cards">
          <div className="card">
            <img alt="someAlt" src={Security} />
            <div className="text">
              <h3>CCTV installs, site visits, alarms</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
          <div className="card">
            <img alt="someAlt" src={Worker} />
            <div className="text">
              <h3>Alarm new installs, site visits</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
          <div className="card">
            <img alt="someAlt" src={Security} />
            <div className="text">
              <h3>Seamlessly visualize quality</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
          <div className="card">
            <img alt="someAlt" src={Security} />
            <div className="text">
              <h3>Temporary Alarms</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
          <div className="card">
            <img alt="someAlt" src={Worker} />
            <div className="text">
              <h3>Alarm reprogramming and Servicing</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
          <div className="card">
            <img alt="someAlt" src={Worker} />
            <div className="text">
              <h3>CCTV installs, site visits</h3>
              <hr />
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                networks.
              </p>
              <button>Here's why</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
