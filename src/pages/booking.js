import React, { useState, useEffect } from "react";
import "../styles/Booking.css";

function Booking(props) {
  const [bookings, cBookings] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshBookings = (id) => {
    props.client.getBookings("-1").then((response) => cBookings(response.data));
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
      <label id="roomLabel" for="rooms">
        Choose a Room:
      </label>
      <select name="rooms" id="roomsSelect">
        {returnRooms()}
      </select>
    </div>
  );
}

export default Quotes;
