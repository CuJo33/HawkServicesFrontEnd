import React, { useState } from "react";
import "./login.css"

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
      
      <br />
      <form className="login-form" onSubmit={(e) => submitHandler(e)}>
      <h4>Login</h4> <br />
        <input
          onChange={(e) => onChange(e, cUser)}
          type="text"
          name="username"
          value={user}
          disabled={disabled} placeholder="Username.."
        />
       
        <input
          onChange={(e) => onChange(e, cPassword)}
          type="password"
          name="password"
          value={password}
          disabled={disabled} placeholder="Password.."
        />
        <br />
        <br />
        <button className="login-button" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
        <br />
      </form>
    </>
  );
}

export default Login;
