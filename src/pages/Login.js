import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [disabled, cDisabled] = useState(false);
  const [user, cUser] = useState("");
  const [password, cPassword] = useState("");

  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);
  };
  const history = useHistory();
  const submitHandler = (e) => {
    console.log("running");
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
        history.push("/quotes");
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
        <h4>Login</h4> <br />
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
        <p>
          If you dont have an account,
          <Link to="/signup"> Please click here to register </Link>
        </p>
        <br />
      </form>
    </>
  );
}

export default Login;
