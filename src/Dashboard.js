import React, { useState, useEffect } from "react";
import Add from "./Add";
import "./App.css";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.eventName}</td>
          <td>{current.location}</td>
          <td>{current.description}</td>
          <td>
            <img id="image" src={current.imageLink} />
          </td>
          <td>{`${new Date(current.date).getUTCDate()}/${
            new Date(current.date).getUTCMonth() + 1
          }/${new Date(current.date).getFullYear()}`}</td>
          <td>{current.time}</td>
          <td>
            <Button
              id="update-button"
              className="btn btn-warning"
              onClick={() => updateEvent(current)}
            >
              {" "}
              update
            </Button>
            <Button
              id="remove-button"
              className="btn btn-danger"
              onClick={() => removeEvent(current._id)}
            >
              {" "}
              remove
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      Dashboard
      <br />
      <Table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date</th>
            <th>Time 24h</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </Table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
      />
    </>
  );
}

export default Dashboard;
