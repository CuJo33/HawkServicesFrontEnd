import React, { useState, useEffect } from "react";
import "../styles/Booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking(props) {
  const [disabled, cDisabled] = useState(false);
  const [bookings, cBookings] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());

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
    <div>
      <h1>Booking</h1>
      {/* <label id="roomLabel" for="rooms">
        Choose a Room:
      </label>
      <select name="rooms" id="roomsSelect">
        {returnBookings()}
      </select> */}
      <form id="contact-form" method="POST">
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
      </form>
    </div>
  );
}

export default Booking;
