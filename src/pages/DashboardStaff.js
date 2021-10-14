import React, { useState, useEffect } from "react";
import "../styles/DashboardStaff.css";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

function DashboardStaff(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [quotes, cQuotes] = useState([]);
  const [jobs, cJobs] = useState([]);
  const [jobStatus, cJobStatus] = useState([]);
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

  const refreshJobStatus = async (id) => {
    let { data } = await props.client.getJobStatusId("-1");
    if (data.length === 0) {
      cJobStatus(false);
    } else {
      cJobStatus(data);
    }
  };

  const refreshQuotes = async (id) => {
    let { data } = await props.client.getQuotesEmployee(props.employeeId);
    if (data.length === 0) {
      cQuotes(false);
    } else {
      cQuotes(data);
    }
  };

  const refreshJobs = async (id) => {
    let { data } = await props.client.getJobsByEmployeeId(props.employeeId);
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

  useEffect(() => {
    refreshJobs();
    refreshJobStatus();
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

  const getClients = (id) => {
    return props.client.getClients(id);
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

  const clickHandler = async (e, quoteId) => {
    if (!clicked) {
      cClicked(!clicked);
      let { data } = await props.client.getJobs(quoteId);
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

  const returnJobStatus = () => {
    return jobStatus.map((current, index) => {
      // console.log(" current ", current, "bookings", bookings, index);
      return (
        <option
          key={index}
          value={current.jobStatusId}
          name={current.jobStatusName}
        >
          {current.fullJobStatusName}
        </option>
      );
    });
  };

  const updateJobStatus = async (e, jobId) => {
    e.preventDefault();
    await props.client
      .updateJobStatus(jobId, e.target.value)
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
    if (e.target.value === "6168104912eefab8c04cb038") {
      await props.client
        .updateStartDate(jobId, e.target.value)
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
    }
    if (e.target.value === "6168116112eefab8c04cb03a") {
      await props.client
        .updateCompleteDate(jobId, e.target.value)
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
    }
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
    <div>
      <h2>Staff</h2>
      {jobs ? (
        <div>
          <h2>Jobs</h2>
          <Table>
            <thead>
              <tr>
                <th>Job Id</th>
                <th>Client Name</th>
                <th>Assigned Employee</th>
                <th>Room</th>
                <th>Service</th>
                <th>Job Status</th>
                <th>Start Date</th>
                <th>Estimated Completion Date</th>
                <th>Completed Date</th>
                <th>Client Sign Off</th>
                <th>Sign Off Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((current, index) => {
                return (
                  <tr key={index}>
                    <td>{current.jobId}</td>
                    <td>
                      {current.firstName} {current.surname}
                    </td>
                    <td>{current.employeeName}</td>
                    <td>{current.roomName}</td>
                    <td>{current.serviceName}</td>
                    <td>
                      {current.jobStatusName}{" "}
                      <select
                        id="jobStatus"
                        onChange={(e) => updateJobStatus(e, current.jobId)}
                      >
                        {returnJobStatus()}
                      </select>
                    </td>
                    <td>{datify(current.startDate)}</td>
                    <td>{datify(current.estimatedCompletionDate)}</td>
                    <td>{datify(current.completedDate)}</td>
                    <td>{String(current.clientSignOff)}</td>
                    <td>{datify(current.clientSignOffDate)}</td>
                    <td>
                      {/* <button
                        onClick={(e) =>
                          createQuote(e, current.bookingId, current.clientId)
                        }
                      >
                        Create a Quote
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h3>You currently have No Jobs scheduled</h3>
        </div>
      )}
    </div>
  );
}

export default DashboardStaff;
