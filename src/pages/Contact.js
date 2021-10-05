import React from "react";
import PhoneLeft from "../assets/phone.jpg";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PhoneLeft})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label className="label" htmlFor="name">
            Full Name
          </label>
          <input
            name="name"
            placeholder="Enter full name..."
            type="text"
            required
          />
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter email..."
            type="email"
            required
          />
          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;