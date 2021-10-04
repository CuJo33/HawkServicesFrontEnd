import React, { useState, useEffect } from "react";
import "../styles/Quotes.css";

function Quotes(props) {
  const [rooms, cRooms] = useState([]);
  const [services, cServices] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshServices = (id) => {
    props.client.getServices("-1").then((response) => cServices(response.data));
  };

  const refreshRooms = () => {
    props.client.getRooms("-1").then((response) => cRooms(response.data));
  };

  useEffect(() => {
    refreshRooms();
    refreshServices();
  }, []);

  const returnRooms = () => {
    return rooms.map((current) => {
      return <option value={current.roomName}>{current.fullRoomName}</option>;
    });
  };

  const returnServices = () => {
    return services.map((current) => {
      return (
        <option value={current.serviceName}>{current.fullServiceName}</option>
      );
    });
  };

  return (
    <div>
      <h1>Quotes</h1>
      <label id="roomLabel" for="rooms">
        Choose a Room:
      </label>
      <select name="rooms" id="roomsSelect">
        {returnRooms()}
      </select>
      <label id="serviceLabel" for="services">
        Choose a Service:
      </label>
      <select name="services" id="serviceSelect">
        {returnServices()}
      </select>
    </div>
  );
}

export default Quotes;
