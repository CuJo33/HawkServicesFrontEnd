import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Table from "react-bootstrap/Table";

function Dashboard(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [quotes, cQuotes] = useState([]);

  const refreshBookings = (id) => {
    props.client.getBookings(props.clientId).then((response) => {
      console.log(response);
      cBookings(response.data);
    });
  };

  const refreshQuotes = (id) => {
    props.client
      .getQuotes(props.clientId)
      .then((response) => cQuotes(response.data));
  };

  useEffect(() => {
    refreshQuotes();
    refreshBookings();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // props.client
    //   .createBooking(props.clientId, props.employeeId, jobList)
    //   .then((response) => {
    //     if (response.data.status === 404) {
    //       throw new Error(response.data.message);
    //     } else if (response.data.status === 200) {
    //       // alert("Quote created");
    //     }
    //     cDisabled(false);
    //   })
    //   .catch((e) => {
    //     alert(e);
    //     cDisabled(false);
    //   });
  };

  const getEmployee = async (id) => {
    // const ret = await props.client.getEmployee(id).then((response) => {
    //   return response.data.username;
    // });
    // console.log(ret);
    return "test";
  };

  return (
    <div>
      <h1 style={{ marginTop: "75px" }}></h1>
      <h2>Bookings</h2>
      <button onClick={(e) => submitHandler(e, props.clientId)}>
        Create a booking
      </button>
      <Table>
        <thead>
          <tr>
            <th>Date Booked</th>
            <th>Estimate Booked Date</th>
            <th>Booked Time</th>
            <th>Assigned Employee</th>
            <th>Estimate Completed</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((current, index) => {
            return (
              <tr key={index}>
                <td>{current.bookedDate}</td>
                <td>{current.requestDate}</td>
                <td>{current.requestTime}</td>
                <td>{getEmployee(current.employeeId)}</td>
                <td>{current.completed}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Quotes</h2>
      {quotes}
      <h2>ClientId</h2>
      {props.clientId}
    </div>
  );
}

export default Dashboard;
