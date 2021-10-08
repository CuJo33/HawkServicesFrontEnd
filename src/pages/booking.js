import React, { useState, useEffect } from "react";
import "../styles/Booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import { useHistory } from "react-router-dom";
import "date-fns";
import Grid from "@mui/material/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function Booking(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [date, cDate] = useState(new Date());
  const [firstName, cFirstName] = useState(undefined);
  const [surname, cSurname] = useState(undefined);
  const [addressLine1, cAddressLine1] = useState(undefined);
  const [addressLine2, cAddressLine2] = useState(undefined);
  const [postCode, cPostCode] = useState(undefined);
  const [telephoneNumber, cTelephoneNumber] = useState(undefined);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // const refreshBookings = (id) => {
  //   props.client.getBookings().then((response) => cBookings(response.data));
  // };

  // const returnBookings = () => {
  //   return bookings.map((current) => {
  //     return (
  //       <option value={current.serviceName}>{current.fullServiceName}</option>
  //     );
  //   });
  // };\
  let roundTime = (time, minutesToRound) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Convert hours and minutes to time in minutes
    time = hours * 60 + minutes;

    let rounded = Math.round(time / minutesToRound) * minutesToRound;
    let rHr = "" + Math.floor(rounded / 60);
    let rMin = "" + (rounded % 60);
    let test = [rHr.padStart(2, "0"), rMin.padStart(2, "0")];
    return test;
  };

  useEffect(() => {
    const current = new Date();
    // refreshBookings();
    const now = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`;
    const rounded = roundTime(now, 15);
    console.log("now", rounded);
    console.log(current, "current");
    const updated = [
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      rounded,
    ];
    const updated2 = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      rounded[0],
      rounded[1]
    );
    console.log(updated2, rounded);
    // console.log("parsed", Date.parse(rounded));
    setSelectedTime(updated2);
  });


  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);

  };

  const history = useHistory();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("i am here");
    console.log(
      props.token,
      date,
      firstName,
      surname,
      addressLine1,
      addressLine2,
      telephoneNumber,
      postCode
    );
    cDisabled(true);
    props.client
      .createBooking(
        props.token,
        date,
        firstName,
        surname,
        addressLine1,
        addressLine2,
        postCode,
        telephoneNumber
      )
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        }
        alert("Booking created");
        cDisabled(false);
        // need to have a page that the cleint Goes to after making a booking
        // history.push("/quotes");
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
  };

  return (
    <>
      {/* <label id="roomLabel" for="rooms">
        Choose a Room:
      </label>
      <select name="rooms" id="roomsSelect">
        {returnBookings()}
      </select> */}
      <Form
        onSubmit={(e) => submitHandler(e)}
        className="mx-auto"
        id="contact-form"
        method="POST"
      >
        <Container className="container-booking mx-auto">
          <br /> <br />
          <Row className="mb-3 form-row">
            <Form.Group as={Row} controlId="formGridTitle">
              <Form.Label>
                <h2> Welcome to Booking page..</h2>
              </Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                placeholder="Enter Firstname.."
                required
                value={firstName}
                onChange={(e) => onChange(e, cFirstName)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridsurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                name="surname"
                type="text"
                placeholder="Enter Surname.."
                required
                value={surname}
                onChange={(e) => onChange(e, cSurname)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTelephoneNumber">
              <Form.Label>Telephone Number</Form.Label>
              <Form.Control
                name="telephoneNumber"
                type="text"
                placeholder="Enter Telephone number.."
                required
                value={telephoneNumber}
                onChange={(e) => onChange(e, cTelephoneNumber)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-1 form-row">
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                name="addressLine1"
                placeholder="Enter your address.."
                required
                value={addressLine1}
                onChange={(e) => onChange(e, cAddressLine1)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address Line2</Form.Label>
              <Form.Control
                as="textarea"
                name="addressLine2"
                placeholder="Enter your address.."
                value={addressLine2}
                onChange={(e) => onChange(e, cAddressLine2)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-5  form-row">
            <Form.Group as={Col} controlId="formGridPostCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                name="postCode"
                placeholder="Enter your Postcode..."
                value={postCode}
                onChange={(e) => onChange(e, cPostCode)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label> Date for estimate</Form.Label>
              {/* <input
                className="form-control"
                name="requestDate"
                type="date"
                value={date}
                onChange={(e) => onChange(e, cDate)}
                required
              /> */}

              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="date-picker"
              >
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    name="selectedDate"
                    variant="dialog"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker"
                    disablePast
                    Color="teal"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label> Time for estimate</Form.Label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                  <KeyboardTimePicker
                    // disableToolbar///////////////////////////////////////
                    placeholder="Choose the time"
                    name="selectedTime"
                    margin="normal"
                    orientation="portrait"
                    id="time-picker"
                    value={selectedTime}
                    minutesStep={15}
                    onChange={handleTimeChange}
                    KeyboardButtonProps={{ "aria-label": "change time" }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridButton">
              <input
                className="form-button"
                variant="success"
                type="submit"
                label="Book an Estimate"
              ></input>
            </Form.Group>
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default Booking;

{
  /* <DatePicker
type="date"
requestDate={startDate}
onChange={(date) => setStartDate(date)}
showTimeSelect
dateFormat="Pp"
></DatePicker> */
}

{
  /* <Form.Group as={Col} controlId="formGridCity">
              <Form.Label> Date for estimate</Form.Label>
              <DatePicker
                requestDate={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </Form.Group> */
}

{
  /* <Form id="contact-form" method="POST">
<label className="label" htmlFor="firstName">
  First Name
</label>
<input
  name="firstName"
  // value={bookings.firstname}
  placeholder="Enter first name..."
  type="text"
  required
/>
<label className="label" htmlFor="surname">
  Surname
</label>
<input
  name="surname"
  placeholder="Enter surname..."
  type="text"
  required
/>
<label className="label" htmlFor="telephoneNumber">
  Telephone Number
</label>
<input
  name="telephoneNumber"
  placeholder="Enter telephone number..."
  type="text"
  required
/>
<label className="label" htmlFor="addressLine1">
  Address Line 1
</label>
<input
  name="addressLine1"
  placeholder="Enter your address..."
  type="text"
  required
/>
<label className="label" htmlFor="addressLine2">
  Address Line 2
</label>
<textarea
  placeholder="Enter your address..."
  name="addressLine2"
  type="text"
></textarea>
<label className="label" htmlFor="postCode">
  PostCode
</label>
<textarea
  placeholder="Enter your Postcode..."
  name="postCode"
  type="text"
></textarea>
<label className="label" htmlFor="requestDate">
  Date for estimate
</label>
<DatePicker
  requestDate={startDate}
  onChange={(date) => setStartDate(date)}
  showTimeSelect
  dateFormat="Pp"
/>
<button type="submit" onSubmit={(e) => submitHandler(e)}>
  Book an Estimate
</button>
</Form> */
}
