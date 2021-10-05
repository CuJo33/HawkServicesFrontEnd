import React, { useState, useEffect } from "react";
import "../styles/Quotes.css";
import Table from "react-bootstrap/Table";

function Quotes(props) {
  const [jobs, cJobs] = useState([]);
  const [rooms, cRooms] = useState([]);
  const [services, cServices] = useState([]);

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
      return (
        <option value={current.fullRoomName}>{current.fullRoomName}</option>
      );
    });
  };

  const returnServices = () => {
    return services.map((current) => {
      return (
        <option value={current.fullServiceName}>
          {current.fullServiceName}
        </option>
      );
    });
  };

  const createJob = (e) => {
    e.preventDefault();
    const add = {
      room: e.target.rooms.value,
      service: e.target.services.value,
    };
    cJobs((p) => {
      return [...p, add];
    });
  };

  return (
    <div>
      <h1 style={{ marginTop: "75px" }}>New Quote</h1>
      <h2>Jobs</h2>
      <Table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((current) => {
            return (
              <tr>
                <td>{current.room}</td>
                <td>{current.service}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <br />
      <h2>Add a Job</h2>
      <form onSubmit={(e) => createJob(e)}>
        {/* map over state array to display all the jobs in the current quote. */}
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
        <input type="submit" label="Create Job"></input>
      </form>
      {/* <button type="submit" onSubmit={(e) => submitHandler(e)}>
        Create another job 
      </button>
    
<button type="submit" onSubmit={(e) => submitHandler(e)}>
        Submit quote
      </button> */}
    </div>
  );
}

export default Quotes;
