import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login(props) {
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
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        if (response.data.status === 401 || response.data.status === 403) {
          throw new Error(response.data.message);
        }
        cDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
  };

  return (
    <>
      Login
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

export default Login;
