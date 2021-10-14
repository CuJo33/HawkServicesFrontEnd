import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import { useHistory } from "react-router-dom";

function SignUp(props) {
  const [disabled, cDisabled] = useState(false);
  const [user, cUser] = useState("");
  const [password, cPassword] = useState("");
  const [email, cEmail] = useState("");

  const onChange = (e, changer) => {
    e.preventDefault();
    changer(e.target.value);
  };

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    props.client
      .signUp(
        e.target.username.value,
        e.target.email.value,
        e.target.password.value,
        "client"
      )
      .then((response) => {
        if (response.data.status === 404) {
          throw new Error(response.data.message);
        } else if (response.data.status === 200) {
          alert(response.data.message + " Please now login");
        }
        cDisabled(false);
        history.push("/login");
      })
      .catch((e) => {
        alert(e);
        console.log(e);
        cDisabled(false);
      });
  };

  return (
    <>
      <br />
      <form className="signup-form" onSubmit={(e) => submitHandler(e)}>
        <h4>Sign Up</h4>
        <br />
        <input
          onChange={(e) => onChange(e, cUser)}
          type="text"
          name="username"
          value={user}
          disabled={disabled}
          placeholder="Username.."
        />

        <input
          onChange={(e) => onChange(e, cEmail)}
          type="email"
          name="email"
          value={email}
          disabled={disabled}
          placeholder="Email.."
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
        <button id="signup-button" type="submit" disabled={disabled}>
          Submit
        </button>

        <p>
          If you already have an account{" "}
          <Link to="/login"> please click here to login </Link>{" "}
        </p>
      </form>
    </>
  );
}

export default SignUp;
