import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginEmployee.css";
import { useHistory } from "react-router-dom";

function LoginEmployee(props) {
  const [disabled, cDisabled] = useState(false);
  const [user, cUser] = useState("");
  const [password, cPassword] = useState("");

  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);
  };

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .loginEmployee(e.target.username.value, e.target.password.value)
      .then((response) => {
        if (response.data.status === 401 || response.data.status === 403) {
          throw new Error(response.data.message);
        }
        cDisabled(false);
        props.loggedInEmployee(
          response.data.token,
          response.data.employeeId,
          response.data.role
        );
        history.push("/dashboardEmployee");
      })
      .catch((e) => {
        alert(e);
        cDisabled(false);
      });
  };

  return (
    <>
      <br />
      <form className="login-form" onSubmit={(e) => submitHandler(e)}>
        <h4>Employee Login</h4> <br />
        <input
          onChange={(e) => onChange(e, cUser)}
          type="text"
          name="username"
          value={user}
          disabled={disabled}
          placeholder="Username.."
        />
        <input
          onChange={(e) => onChange(e, cPassword)}
          type="password"
          name="password"
          value={password}
          disabled={disabled}
          placeholder="Password.."
        />
        <br />
        <br />
        <input
          className="login-button"
          type="submit"
          disabled={disabled}
          label="Submit"
        ></input>
        <br />
        <br />
        <p>
          <Link to="/login">Return</Link>
        </p>
      </form>
    </>
  );
}

export default LoginEmployee;
