import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import SignUp from "./SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Cujo_head from "./cujo_head.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";
import "./App.css";

function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const login = (t) => {
    window.localStorage.setItem("token", t);
    changeToken(t);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    // changeToken(undefined);
  };

  return (
    <>
      <Navbar id="navbar" bg="info" variant="dark">
        <img
          className="ml-3"
          id="logo"
          src={Cujo_head}
          alt="Creator avatar"
          width="100"
          height="100"
        />
        <Navbar.Brand className="ml-3" id="branding-header">
          presents...
        </Navbar.Brand>
      </Navbar>
      <Container id="container-name">
        <h2>An Event List</h2>
      </Container>
      <Container className="mt-3" id="container-box">
        <br />
        {token ? (
          <Dashboard client={client} />
        ) : (
          <Container>
            <Row>
              <Col>
                <Login loggedIn={(t) => login(t)} client={client}></Login>
              </Col>
              <Col>
                <SignUp client={client} />
              </Col>
            </Row>
          </Container>
        )}
        <br></br>
      </Container>
    </>
  );
}

export default App;
