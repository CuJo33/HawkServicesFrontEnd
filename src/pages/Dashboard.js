import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [quotes, cQuotes] = useState([]);
  const [quoteId, cQuoteId] = useState(undefined);
  const [jobs, cJobs] = useState([]);
  const [clicked, cClicked] = useState(false);

  const history = useHistory();

  const refreshBookings = async () => {
    // get all the bookings, and store it in data: [{},{}]
    let { data } = await props.client.getBookings(props.clientId);
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
    let { data } = await props.client.getQuotes(props.clientId);
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
      cQuotes(false);
    } else {
      cQuotes(data);
    }
  };

  const refreshJobs = async (id) => {
    let { data } = await props.client.getJobsByQuoteId(quoteId);
    data = await Promise.all(
      // map over jobs
      data.map(async (v, i) => {
        // get room name (async)
        const res1 = await getRooms(v.roomId);
        const res2 = await getServices(v.serviceId);
        const res3 = await getJobStatusId(v.jobStatusId);
        const res4 = await getEmployee(v.employeeId);
        const res5 = await getClients(v.clientId);
        // make a new object, duplicate of jobs with new feild, roomName
        return {
          ...v,
          roomName: res1.data.fullRoomName,
          serviceName: res2.data.fullServiceName,
          jobStatusName: res3.data.fullJobStatusName,
          employeeName: res4.data.username,
          firstName: res5.data.firstName,
          surname: res5.data.surname,
        };
      })
    );
    if (data.length === 0) {
      cJobs(false);
    } else {
      cJobs(data);
    }
  };
  const getClients = (id) => {
    return props.client.getClients(id);
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

  const acceptQuoteHandler = async (e, quoteId) => {
    e.preventDefault();
    await props.client
      .acceptQuote(quoteId)
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          // alert("Quote accepted");
        }
        cDisabled(false);
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
    refreshQuotes();
  };

  const clickHandler = async (e, quoteId) => {
    if (!clicked) {
      cClicked(!clicked);
      cQuoteId(quoteId);
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
      cQuoteId(undefined);
    }
  };

  const updateSignOff = async (e, jobId, quoteId) => {
    e.preventDefault();
    await props.client
      .updateJobSignOff(jobId)
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          // alert("Quote created");
        }
        cDisabled(false);
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
    refreshJobs();
  };

  const datify = (date) => {
    console.log(date);
    if (!date) {
      return "";
    }
    let ret = new Date(date);
    let month =
      ret.getMonth() < 10 ? `0${ret.getMonth()}` : `${ret.getMonth()}`;
    let day = ret.getDay() < 10 ? `0${ret.getDay()}` : `${ret.getDay()}`;
    ret = `${ret.getFullYear()}/${month}/${day}`;
    return ret;
  };

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>
      <h2>Client</h2>
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
              </tr>
            </thead>
            <tbody>
              {bookings.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{datify(current.bookedDate)}</td>
                    <td>{current.requestDate}</td>
                    <td>{current.requestTime}</td>
                    <td>{current.employeeName}</td>
                    <td>{String(current.completed)}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div>
            <button
              className="dashboard-button"
              onClick={(e) => submitHandler(e, props.clientId)}
            >
              Create another booking
            </button>
          </div>
        </div>
      ) : (
        <div className="create-booking">
          <h3>You currently have No bookings</h3>
          <button
            className="dashboard-button"
            onClick={(e) => submitHandler(e, props.clientId)}
          >
            Create a booking
          </button>
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
                    <td>{datify(current.requestDate)}</td>
                    <td>{current.employeeName}</td>
                    <td>{String(current.clientAccepted)}</td>
                    <button
                      onClick={(e) => acceptQuoteHandler(e, current.quoteId)}
                    >
                      Accept Quote
                    </button>
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
                      <td>
                        {String(current.clientSignOff)}
                        {current.jobStatusName === "Awaiting Sign Off" ? (
                          <button
                            onClick={(e) =>
                              updateSignOff(e, current.jobId, quoteId)
                            }
                          >
                            Sign Off Work
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </td>
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
          <h4>You currently have No quotes</h4>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
