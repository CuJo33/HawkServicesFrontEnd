import React, { useState, useEffect } from "react";
import "../styles/Booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";

function Booking(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [date, setDate] = useState(new Date());

  // const refreshBookings = (id) => {
  //   props.client.getBookings().then((response) => cBookings(response.data));
  // };

  // const returnBookings = () => {
  //   return bookings.map((current) => {
  //     return (
  //       <option value={current.serviceName}>{current.fullServiceName}</option>
  //     );
  //   });
  // };

  useEffect(() => {
    // refreshBookings();
  }, []);

  const changeDate = (date) => {
    setDate(date);
    console.log(date);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .createBooking(
        e.target.requestDate.value,
        e.target.firstName.value,
        e.target.surname.value,
        e.target.addressLine1.value,
        e.target.addressLine2.value,
        e.target.postCode.value,
        e.target.telephonNumber.value
      )
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          alert("Booking created");
        }
        cDisabled(false);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
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

      <Form className="mx-auto" id="contact-form" method="POST">
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
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridsurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                name="surname"
                type="text"
                placeholder="Enter Surname.."
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTelephoneNumber">
              <Form.Label>Telephone Number</Form.Label>
              <Form.Control
                name="telephoneNumber"
                type="text"
                placeholder="Enter Telephone number.."
                required
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
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address Line2</Form.Label>
              <Form.Control
                as="textarea"
                name="addressLine2"
                placeholder="Enter your address.."
              />
            </Form.Group>
          </Row>
          <Row className="mb-5  form-row">
            <Form.Group as={Col} controlId="formGridPostCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                name="postCode"
                placeholder="Enter your Postcode..."
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label> Date for estimate</Form.Label>
              <input
                className="form-control"
                name="requestDate"
                type="date"
                requestDate={date}
                onChange={changeDate}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridButton">
              <button
                className="form-button"
                variant="success"
                type="submit"
                onSubmit={(e) => submitHandler(e)}
                value={date}
              >
                Book an Estimate
              </button>
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
