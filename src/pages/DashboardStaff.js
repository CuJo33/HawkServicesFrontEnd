import React, { useState, useEffect } from "react";
import "../styles/DashboardStaff.css";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

function DashboardStaff(props) {
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

  return (
    <div className="dashboard-staff">
      <h2>Staff</h2>
    </div>
  );
}

export default DashboardStaff;
