import React, { useState, useEffect } from "react";
import "../styles/DashboardEstimator.css";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

function DashboardEstimator(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [quotes, cQuotes] = useState([]);
  const [jobs, cJobs] = useState([]);
  const [clicked, cClicked] = useState(false);

  const history = useHistory();

  const refreshBookings = async () => {
    // get all the bookings, and store it in data: [{},{}]
    let { data } = await props.client.getBookingsEmployee(props.employeeId);
    // mapping over async stuff gets tricky
    // await an array of promises, and store their resolution in data
    data = await Promise.all(
      // map over booking
      data.map(async (v, i) => {
        // get employee name (async)
        const res = await getEmployee(v.employeeId);
        // make a new object, duplicate of booking with new feild, employeeName
        return { ...v, employeeName: res.data.username };
      })
    );
    if (data.length === 0) {
      cBookings(false);
    } else {
      cBookings(data);
    }
  };

  const refreshQuotes = async (id) => {
    let { data } = await props.client.getQuotesEmployee(props.employeeId);
    if (data.length === 0) {
      cQuotes(false);
    } else {
      data = await Promise.all(
        // map over jobs
        data.map(async (v, i) => {
          // get room name (async)
          const res4 = await getEmployee(v.employeeId);
          // make a new object, duplicate of jobs with new feild, roomName
          return {
            ...v,
            employeeName: res4.data.username,
          };
        })
      );
      cQuotes(data);
    }
  };

  useEffect(() => {
    refreshQuotes();
    refreshBookings();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/booking");
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

  const getEmployee = (id) => {
    return props.client.getEmployee(id);
  };

  const getRooms = (id) => {
    return props.client.getRooms(id);
  };

  const getServices = (id) => {
    return props.client.getServices(id);
  };

  const getJobStatusId = (id) => {
    return props.client.getJobStatusId(id);
  };

  const acceptQuoteHandler = (e, quoteId) => {
    e.preventDefault();
    props.client
      .acceptQuote(quoteId)
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          alert("Quote accepted");
        }
        cDisabled(false);
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
    refreshQuotes();
  };

  const createQuote = (e, bookingId, ClientId) => {
    props.clientChanger(ClientId);
    history.push("/quotes");
  };

  const clickHandler = async (e, quoteId) => {
    if (!clicked) {
      cClicked(!clicked);
      let { data } = await props.client.getJobsByQuoteId(quoteId);
      data = await Promise.all(
        // map over jobs
        data.map(async (v, i) => {
          // get room name (async)
          const res1 = await getRooms(v.roomId);
          const res2 = await getServices(v.serviceId);
          const res3 = await getJobStatusId(v.jobStatusId);
          const res4 = await getEmployee(v.employeeId);
          // make a new object, duplicate of jobs with new feild, roomName
          return {
            ...v,
            roomName: res1.data.fullRoomName,
            serviceName: res2.data.fullServiceName,
            jobStatusName: res3.data.fullJobStatusName,
            employeeName: res4.data.username,
          };
        })
      );
      cDisabled(false);
      await cJobs(data);
    } else {
      cClicked(!clicked);
    }
  };

  return (
    <div>
      <h2>Estimator</h2>
      {bookings ? (
        <div>
          <h2>Bookings</h2>
          <Table>
            <thead>
              <tr>
                <th>Date Booked</th>
                <th>Estimate Booked Date</th>
                <th>Booked Time</th>
                <th>Assigned Employee</th>
                <th>Estimate Completed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{current.bookedDate}</td>
                    <td>{current.requestDate}</td>
                    <td>{current.requestTime}</td>
                    <td>{current.employeeName}</td>
                    <td>{String(current.completed)}</td>
                    <td>
                      <button
                        onClick={(e) =>
                          createQuote(e, current.bookingId, current.clientId)
                        }
                      >
                        Create a Quote
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h3>You currently have No bookings scheduled</h3>
        </div>
      )}
      <br />
      <br />
      {quotes ? (
        <div>
          <h2>Quotes</h2>
          <Table>
            <thead>
              <tr>
                <th>Quote Id</th>
                <th>Job List</th>
                <th>Request Date</th>
                <th>Estimated by</th>
                <th>Client Accepted</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{current.quoteId}</td>
                    <td>
                      <button onClick={(e) => clickHandler(e, current.quoteId)}>
                        See Job List
                      </button>
                    </td>
                    <td>{current.requestDate}</td>
                    <td>{current.employeeName}</td>
                    <td>{String(current.clientAccepted)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {clicked ? (
            <Table>
              <thead>
                <tr>
                  <th>Job Number</th>
                  <th>Room Name</th>
                  <th>Service Name</th>
                  <th>Job Status</th>
                  <th>Assigned To</th>
                  <th>Client Sign off</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((current, index) => {
                  return (
                    <tr key={index}>
                      <td>{current.jobId}</td>
                      <td>{current.roomName}</td>
                      <td>{current.serviceName}</td>
                      <td>{current.jobStatusName}</td>
                      <td>{current.employeeName}</td>
                      <td>{String(current.clientSignOff)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          <h4>You currently have No open quotes</h4>
        </div>
      )}
    </div>
  );
}

export default DashboardEstimator;
