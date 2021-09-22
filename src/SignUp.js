import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignUp(props) {
  const [disabled, cDisabled] = useState(false);
  const [user, cUser] = useState("");
  const [password, cPassword] = useState("");

  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .signUp(e.target.username.value, e.target.password.value)
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          alert(response.data.message + " Please now login");
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
      Sign Up
      <br />
      <Form onSubmit={(e) => submitHandler(e)}>
        username
        <br />
        <input
          onChange={(e) => onChange(e, cUser)}
          type="text"
          name="username"
          value={user}
          disabled={disabled}
        />
        <br />
        password
        <br />
        <input
          onChange={(e) => onChange(e, cPassword)}
          type="password"
          name="password"
          value={password}
          disabled={disabled}
        />
        <br />
        <br />
        <Button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </>
  );
}

export default SignUp;
