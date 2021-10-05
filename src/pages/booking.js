import React, { useState, useEffect } from "react";
import "../styles/Booking.css";

function Booking(props) {
  const [bookings, cBookings] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshBookings = (id) => {
    props.client.getBookings().then((response) => cBookings(response.data));
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  const returnBookings = () => {
    return bookings.map((current) => {
      return (
        <option value={current.serviceName}>{current.fullServiceName}</option>
      );
    });
  };

  return (
    <div>
      <h1>Booking</h1>
      {/* <label id="roomLabel" for="rooms">
        Choose a Room:
      </label>
      <select name="rooms" id="roomsSelect">
        {returnBookings()}
      </select> */}
      <form id="contact-form" method="POST">
        <label className="label" htmlFor="firstName">
          First Name
        </label>
        <input
          name="firstName"
          placeholder="Enter first name..."
          type="text"
          required
        />
        <label className="label" htmlFor="surname">
          Surname
        </label>
        <input
          name="surname"
          placeholder="Enter surname..."
          type="text"
          required
        />
        <label className="label" htmlFor="name">
          Telephone Number
        </label>
        <input
          name="telephoneNumber"
          placeholder="Enter telephone number..."
          type="text"
          required
        />
        <label className="label" htmlFor="email">
          Address Line 1
        </label>
        <input
          name="addressLine1"
          placeholder="Enter your address..."
          type="text"
          required
        />
        <label className="label" htmlFor="message">
          Address Line 2
        </label>
        <textarea
          placeholder="Enter your address..."
          name="addressLine2"
          type="text"
        ></textarea>
        <label className="label" htmlFor="message">
          PostCode
        </label>
        <textarea
          placeholder="Enter your Postcode..."
          name="postCode"
          type="text"
        ></textarea>
        <button type="submit"> Book an Estimate</button>
      </form>
    </div>
  );
}

export default Booking;
