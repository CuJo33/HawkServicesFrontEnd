import React from "react";
import PhoneLeft from "../assets/phone.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Contact.css";

toast.configure();

function Contact() {
  const Notify = () => {
    toast.success("Your message has been sent!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
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
          <button className="submit-button" onClick={Notify} type="reset">
            {" "}
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
