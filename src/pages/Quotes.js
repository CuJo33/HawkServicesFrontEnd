import React, { useState, useEffect } from "react";
import "../styles/Quotes.css";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

function Quotes(props) {
  const [disabled, cDisabled] = useState(false);
  const [jobs, cJobs] = useState([]);
  const [rooms, cRooms] = useState([]);
  const [services, cServices] = useState([]);
  const [formService, cFormService] = useState();
  const [formRoom, cFormRoom] = useState();
  const [clicked, cClicked] = useState(false);

  const history = useHistory();

  const refreshServices = (id) => {
    props.client.getServices("-1").then((response) => {
      cFormService(response.data[0].fullServiceName);
      cServices(response.data);
    });
  };

  const refreshRooms = () => {
    props.client.getRooms("-1").then((response) => {
      cFormRoom(response.data[0].fullRoomName);

      cRooms(response.data);
    });
  };

  useEffect(() => {
    // console.log(props);
    refreshRooms();
    refreshServices();
  }, []);

  const returnRooms = () => {
    return rooms.map((current, index) => {
      return (
        <option key={index} value={current.roomId} name={current.fullRoomName}>
          {current.fullRoomName}
        </option>
      );
    });
  };

  const returnServices = () => {
    return services.map((current, index) => {
      return (
        <option
          key={index}
          value={current.serviceId}
          name={current.fullServiceName}
        >
          {current.fullServiceName}
        </option>
      );
    });
  };

  const deleteJobHandler = (e, jobId) => {
    e.preventDefault();
    props.client.deleteJob(jobId);
    cJobs((p) => {
      const newArray = p.filter((i) => {
        return i.jobId != jobId;
      });
      return newArray;
    });
  };

  const createJob = (e) => {
    e.preventDefault();

    props.client
      .createJob(
        props.passedClientId,
        e.target.rooms.value,
        e.target.services.value
      )
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          // alert("Job created");
        }
        cDisabled(false);
        cJobs((p) => {
          return [
            ...p,
            {
              jobId: response.data.jobId,
              room: formRoom,
              service: formService,
            },
          ];
        });
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
  };

  const handleChange = (e, arg) => {
    e.preventDefault();
    const target = e.target.value;
    if (arg === "rooms") {
      rooms.map((c) => {
        if (c.roomId === target) {
          cFormRoom(c.fullRoomName);
        }
      });
    }
    if (arg === "services") {
      services.map((c) => {
        if (c.serviceId === target) {
          cFormService(c.fullServiceName);
        }
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const jobList = [];
    jobs.map((j) => {
      jobList.push(j.jobId);
    });
    props.client
      .createQuote(props.passedClientId, props.employeeId, jobList)
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
    history.push("/dashboardEstimator");
  };

  return (
    <div className="quotes-page">
      <h2>New Quote</h2>
      <h2>Jobs</h2>
      <Table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Service</th>
            <th>JobId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((current, index) => {
            return (
              <tr key={index}>
                <td>{current.room}</td>
                <td>{current.service}</td>
                <td>{current.jobId}</td>
                <td>
                  <button
                    className="delete-job"
                    onClick={(e) => deleteJobHandler(e, current.jobId)}
                  >
                    Delete Job
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Add a Job</h2>
      <form className="quotes-form" onSubmit={(e) => createJob(e)}>
        {/* map over state array to display all the jobs in the current quote. */}
        <label id="roomLabel" htmlFor="rooms">
          Choose a Room:
        </label>
        <select id="rooms" onChange={(e) => handleChange(e, "rooms")}>
          {returnRooms()}
        </select>
        <label id="serviceLabel" htmlFor="services">
          Choose a Service:
        </label>
        <select id="services" onChange={(e) => handleChange(e, "services")}>
          {returnServices()}
        </select>
        <input type="submit" label="Create Job"></input>
      </form>
      <button id="submit-quote" type="submit" onClick={(e) => submitHandler(e)}>
        Submit Quote
      </button>
      <br />
    </div>
  );
}

export default Quotes;
