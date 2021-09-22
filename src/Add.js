import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [eventName, cEventName] = useState(props.currentEvent?.eventName || "");
  const [location, cLocation] = useState(props.currentEvent?.location || "");
  const [description, cDescription] = useState(
    props.currentEvent?.description || ""
  );
  const [imageLink, cImageLink] = useState(props.currentEvent?.imagelink || "");
  const [date, cDate] = useState(props.currentEvent?.date || "");
  const [time, cTime] = useState(props.currentEvent?.time || "");

  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.imageLink.value,
        e.target.date.value,
        e.target.time.value
      );
    } else {
      result = props.client.addEvent(
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.imageLink.value,
        e.target.date.value,
        e.target.time.value
      );
    }
    result
      .then(() => {
        cDisabled(false);
        cEventName("");
        cLocation("");
        cDescription("");
        cImageLink("");
        cDate("");
        cTime("");
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentEvent ? "Update event" : "Add New Event"}
      <br />

      <Form autocomplete="off" onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          onChange={(e) => onChange(e, cEventName)}
          type="text"
          value={props.currentEvent?.eventName || eventName}
          name="eventName"
          disabled={disabled}
        />
        <br />
        Location:
        <br />
        <input
          onChange={(e) => onChange(e, cLocation)}
          type="text"
          value={props.currentEvent?.location || location}
          name="location"
          disabled={disabled}
        />
        <br />
        Description:
        <br />
        <input
          onChange={(e) => onChange(e, cDescription)}
          type="text"
          value={props.currentEvent?.description || description}
          name="description"
          disabled={disabled}
        />
        <br />
        Image Link (https://somelinkhere):
        <br />
        <input
          onChange={(e) => onChange(e, cImageLink)}
          type="text"
          value={props.currentEvent?.imageLink || imageLink}
          name="imageLink"
          disabled={disabled}
        />
        <br />
        Date:
        <br />
        <input
          onChange={(e) => onChange(e, cDate)}
          type="date"
          value={props.currentEvent?.date || date}
          name="date"
          disabled={disabled}
        />
        <br />
        Time 24h:
        <br />
        <input
          onChange={(e) => onChange(e, cTime)}
          type="time"
          value={props.currentEvent?.time || time}
          name="time"
          disabled={disabled}
        />
        <br />
        <br />
        <Button className="btn btn-success" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </>
  );
}

export default Add;
